import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Blob "mo:core/Blob";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module PartnerProfile {
    type VehicleType = {
      #bike;
      #car;
      #van;
      #truck;
    };

    type Status = {
      #active;
      #inactive;
    };

    public type PartnerData = {
      id : Text;
      name : Text;
      phone : Text;
      vehicleType : VehicleType;
      status : Status;
      rating : Float;
      documents : [Storage.ExternalBlob];
      createdAt : Time.Time;
    };

    public type PartnerDataIdentifier = Text;
  };

  module Earnings {
    public type EarningsData = {
      partnerId : Text;
      amount : Float;
      paymentType : { #cod; #online };
      createdAt : Time.Time;
    };

    public type EarningsDataIdentifier = Nat;
  };

  module Cancellation {
    public type CancellationData = {
      orderId : Text;
      partnerId : Text;
      reason : Text;
      charge : Float;
      createdAt : Time.Time;
    };

    public type CancellationDataIdentifier = Nat;
  };

  module Return {
    public type ReturnData = {
      orderId : Text;
      partnerId : Text;
      reason : Text;
      charge : Float;
      createdAt : Time.Time;
    };

    public type ReturnDataIdentifier = Nat;
  };

  module Order {
    public type OrderStatus = {
      #accepted;
      #pickedUp;
      #outForDelivery;
      #delivered;
      #cancelled;
      #returned;
    };

    public type OrderData = {
      id : Text;
      partnerId : Text;
      status : OrderStatus;
      orderType : Text;
      createdAt : Time.Time;
      updatedAt : Time.Time;
      charges : Float;
    };

    public type OrderDataIdentifier = Text;
  };
  include MixinStorage();

  // Use access control module for authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let partnersMap = Map.empty<PartnerProfile.PartnerDataIdentifier, PartnerProfile.PartnerData>();
  let ordersMap = Map.empty<Order.OrderDataIdentifier, Order.OrderData>();
  let earningsMap = Map.empty<Earnings.EarningsDataIdentifier, Earnings.EarningsData>();
  let cancellationsMap = Map.empty<Cancellation.CancellationDataIdentifier, Cancellation.CancellationData>();
  let returnsMap = Map.empty<Return.ReturnDataIdentifier, Return.ReturnData>();
  var nextEarningId = 0;
  var nextCancellationId = 0;
  var nextReturnId = 0;
  var globalOrderId : Nat = 0;

  // Map to link Principal to Partner ID
  let principalToPartnerMap = Map.empty<Principal, Text>();

  public type UserProfile = {
    name : Text;
    partnerId : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
    principalToPartnerMap.add(caller, profile.partnerId);
  };

  public shared ({ caller }) func addPartner(profile : PartnerProfile.PartnerData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add partners");
    };
    partnersMap.add(profile.id, profile);
  };

  public shared ({ caller }) func updatePartnerDocuments(partnerId : PartnerProfile.PartnerDataIdentifier, newDocuments : [Storage.ExternalBlob]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update documents");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only update your own documents");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let current = switch (partnersMap.get(partnerId)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Partner not found") };
    };
    let updated = {
      current with
      documents = newDocuments;
    };
    partnersMap.add(partnerId, updated);
  };

  public query ({ caller }) func getPartner(partnerId : PartnerProfile.PartnerDataIdentifier) : async PartnerProfile.PartnerData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view partner profiles");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own profile");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    switch (partnersMap.get(partnerId)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Partner not found") };
    };
  };

  public query ({ caller }) func getAllPartners() : async [PartnerProfile.PartnerData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all partners");
    };
    partnersMap.values().toArray();
  };

  public shared ({ caller }) func addEarnings(earnings : Earnings.EarningsData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add earnings");
    };
    let id = nextEarningId;
    nextEarningId += 1;
    earningsMap.add(id, earnings);
  };

  public query ({ caller }) func getEarnings(partnerId : Text) : async [Earnings.EarningsData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view earnings");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own earnings");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let earningsIter = earningsMap.values();
    let filtered = List.empty<Earnings.EarningsData>();

    for (earning in earningsIter) {
      if (earning.partnerId == partnerId) {
        filtered.add(earning);
      };
    };

    filtered.toArray();
  };

  public shared ({ caller }) func addCancellation(cancellation : Cancellation.CancellationData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add cancellations");
    };
    let id = nextCancellationId;
    nextCancellationId += 1;
    cancellationsMap.add(id, cancellation);
  };

  public query ({ caller }) func getCancellations(partnerId : Text) : async [Cancellation.CancellationData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cancellations");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own cancellations");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let cancellationsIter = cancellationsMap.values();
    let filtered = List.empty<Cancellation.CancellationData>();

    for (cancellation in cancellationsIter) {
      if (cancellation.partnerId == partnerId) {
        filtered.add(cancellation);
      };
    };

    filtered.toArray();
  };

  public shared ({ caller }) func addReturn(returnData : Return.ReturnData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add returns");
    };
    let id = nextReturnId;
    nextReturnId += 1;
    returnsMap.add(id, returnData);
  };

  public query ({ caller }) func getReturns(partnerId : Text) : async [Return.ReturnData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view returns");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own returns");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let returnsIter = returnsMap.values();
    let filtered = List.empty<Return.ReturnData>();

    for (returnItem in returnsIter) {
      if (returnItem.partnerId == partnerId) {
        filtered.add(returnItem);
      };
    };

    filtered.toArray();
  };

  public shared ({ caller }) func addOrder(orderData : Order.OrderData) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add orders");
    };
    var orderId = orderData.id;

    if (orderId == "") {
      orderId := globalOrderId.toText();
      let newOrderData = {
        orderData with
        id = orderId;
      };
      ordersMap.add(orderId, newOrderData);
      globalOrderId += 1;
    } else {
      ordersMap.add(orderId, orderData);
    };
  };

  public query ({ caller }) func getAvailableOrders() : async [Order.OrderData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view available orders");
    };

    let ordersIter = ordersMap.values();
    let filtered = List.empty<Order.OrderData>();

    for (orderItem in ordersIter) {
      if (orderItem.status == #accepted) {
        filtered.add(orderItem);
      };
    };

    filtered.toArray();
  };

  public query ({ caller }) func getOrder(orderId : Order.OrderDataIdentifier) : async Order.OrderData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    let order = switch (ordersMap.get(orderId)) {
      case (?order) { order };
      case (null) { Runtime.trap("Order not found") };
    };

    // Check if caller is the partner assigned to this order or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (order.partnerId != pid and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    order;
  };

  public query ({ caller }) func getPartnerOrders(partnerId : Text) : async [Order.OrderData] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    // Check if caller is the partner or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (pid != partnerId and not isAdmin) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let ordersIter = ordersMap.values();
    let filtered = List.empty<Order.OrderData>();

    for (orderItem in ordersIter) {
      if (orderItem.partnerId == partnerId) {
        filtered.add(orderItem);
      };
    };

    filtered.toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Order.OrderDataIdentifier, newStatus : Order.OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update order status");
    };

    let current = switch (ordersMap.get(orderId)) {
      case (?order) { order };
      case (null) { Runtime.trap("Order not found") };
    };

    // Check if caller is the partner assigned to this order or admin
    let callerPartnerId = principalToPartnerMap.get(caller);
    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    
    switch (callerPartnerId) {
      case (?pid) {
        if (current.partnerId != pid and not isAdmin) {
          Runtime.trap("Unauthorized: Can only update your own orders");
        };
      };
      case (null) {
        if (not isAdmin) {
          Runtime.trap("Unauthorized: Partner ID not found for caller");
        };
      };
    };

    let updated = {
      current with
      status = newStatus;
    };
    ordersMap.add(orderId, updated);
  };

  public query ({ caller }) func getOrderCountByType() : async [(Text, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view analytics");
    };

    let ordersIter = ordersMap.values();
    let aggregateMap = Map.empty<Text, Nat>();

    for (order in ordersIter) {
      let count = switch (aggregateMap.get(order.orderType)) {
        case (null) { 0 };
        case (?existing) { existing };
      };
      aggregateMap.add(order.orderType, count + 1);
    };

    aggregateMap.toArray();
  };
};
