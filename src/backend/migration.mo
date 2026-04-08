import Map "mo:core/Map";

module {
  // Old types defined inline (from .old/src/backend/dist/backend.most)
  type OldUserRole = { #admin; #guest; #user };
  type OldAccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, OldUserRole>;
  };

  type OldVehicleType = { #bike; #car; #truck; #van };
  type OldStatus = { #active; #inactive };
  // ExternalBlob was Blob in the old version
  type OldPartnerData = {
    id : Text;
    name : Text;
    phone : Text;
    vehicleType : OldVehicleType;
    status : OldStatus;
    rating : Float;
    documents : [Blob];
    createdAt : Int;
  };
  type OldPaymentType = { #cod; #online };
  type OldEarningsData = {
    partnerId : Text;
    amount : Float;
    paymentType : OldPaymentType;
    createdAt : Int;
  };
  type OldCancellationData = {
    orderId : Text;
    partnerId : Text;
    reason : Text;
    charge : Float;
    createdAt : Int;
  };
  type OldReturnData = {
    orderId : Text;
    partnerId : Text;
    reason : Text;
    charge : Float;
    createdAt : Int;
  };
  type OldOrderStatus = {
    #accepted; #cancelled; #delivered; #outForDelivery; #pickedUp; #returned;
  };
  type OldOrderData = {
    id : Text;
    partnerId : Text;
    status : OldOrderStatus;
    orderType : Text;
    createdAt : Int;
    updatedAt : Int;
    charges : Float;
  };
  type OldUserProfile = { name : Text; partnerId : Text };

  type OldActor = {
    accessControlState : OldAccessControlState;
    partnersMap : Map.Map<Text, OldPartnerData>;
    ordersMap : Map.Map<Text, OldOrderData>;
    earningsMap : Map.Map<Nat, OldEarningsData>;
    cancellationsMap : Map.Map<Nat, OldCancellationData>;
    returnsMap : Map.Map<Nat, OldReturnData>;
    var nextEarningId : Nat;
    var nextCancellationId : Nat;
    var nextReturnId : Nat;
    var globalOrderId : Nat;
    principalToPartnerMap : Map.Map<Principal, Text>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  // New types
  public type DocumentRef = {
    id : Text;
    url : Text;
    name : Text;
    contentType : Text;
  };

  type NewVehicleType = { #bike; #car; #truck; #van };
  type NewStatus = { #active; #inactive };
  type NewPartnerData = {
    id : Text;
    name : Text;
    phone : Text;
    vehicleType : NewVehicleType;
    status : NewStatus;
    rating : Float;
    documents : [DocumentRef];
    createdAt : Int;
  };
  type NewPaymentType = { #cod; #online };
  type NewEarningsData = {
    partnerId : Text;
    amount : Float;
    paymentType : NewPaymentType;
    createdAt : Int;
  };
  type NewCancellationData = {
    orderId : Text;
    partnerId : Text;
    reason : Text;
    charge : Float;
    createdAt : Int;
  };
  type NewReturnData = {
    orderId : Text;
    partnerId : Text;
    reason : Text;
    charge : Float;
    createdAt : Int;
  };
  type NewOrderStatus = {
    #accepted; #cancelled; #delivered; #outForDelivery; #pickedUp; #returned;
  };
  type NewOrderData = {
    id : Text;
    partnerId : Text;
    status : NewOrderStatus;
    orderType : Text;
    createdAt : Int;
    updatedAt : Int;
    charges : Float;
  };
  type NewUserProfile = { name : Text; partnerId : Text };

  type NewActor = {
    adminSet : Map.Map<Principal, Bool>;
    userSet : Map.Map<Principal, Bool>;
    partnersMap : Map.Map<Text, NewPartnerData>;
    ordersMap : Map.Map<Text, NewOrderData>;
    earningsMap : Map.Map<Nat, NewEarningsData>;
    cancellationsMap : Map.Map<Nat, NewCancellationData>;
    returnsMap : Map.Map<Nat, NewReturnData>;
    var nextEarningId : Nat;
    var nextCancellationId : Nat;
    var nextReturnId : Nat;
    var globalOrderId : Nat;
    principalToPartnerMap : Map.Map<Principal, Text>;
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    // Migrate accessControlState → adminSet + userSet
    let adminSet = Map.empty<Principal, Bool>();
    let userSet = Map.empty<Principal, Bool>();
    for ((principal, role) in old.accessControlState.userRoles.entries()) {
      switch (role) {
        case (#admin) { adminSet.add(principal, true) };
        case (#user) { userSet.add(principal, true) };
        case (#guest) { userSet.add(principal, true) };
      };
    };

    // Migrate partnersMap: convert documents [Blob] → [DocumentRef] (empty docs since Blobs can't be converted)
    let partnersMap = old.partnersMap.map<Text, OldPartnerData, NewPartnerData>(
      func(_id, p) {
        {
          p with
          documents = [] : [DocumentRef];
        }
      }
    );

    {
      adminSet;
      userSet;
      partnersMap;
      ordersMap = old.ordersMap;
      earningsMap = old.earningsMap;
      cancellationsMap = old.cancellationsMap;
      returnsMap = old.returnsMap;
      var nextEarningId = old.nextEarningId;
      var nextCancellationId = old.nextCancellationId;
      var nextReturnId = old.nextReturnId;
      var globalOrderId = old.globalOrderId;
      principalToPartnerMap = old.principalToPartnerMap;
      userProfiles = old.userProfiles;
    };
  };
};
