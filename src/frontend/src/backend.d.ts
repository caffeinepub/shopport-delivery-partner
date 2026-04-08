import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderData {
    id: string;
    status: OrderStatus;
    createdAt: Time;
    orderType: string;
    partnerId: string;
    updatedAt: Time;
    charges: number;
}
export type Time = bigint;
export type PartnerDataIdentifier = string;
export interface EarningsData {
    createdAt: Time;
    partnerId: string;
    paymentType: Variant_cod_online;
    amount: number;
}
export interface DocumentRef {
    id: string;
    url: string;
    contentType: string;
    name: string;
}
export interface ReturnData {
    createdAt: Time;
    orderId: string;
    partnerId: string;
    charge: number;
    reason: string;
}
export interface CancellationData {
    createdAt: Time;
    orderId: string;
    partnerId: string;
    charge: number;
    reason: string;
}
export interface PartnerData {
    id: string;
    status: Status;
    vehicleType: VehicleType;
    documents: Array<DocumentRef>;
    name: string;
    createdAt: Time;
    rating: number;
    phone: string;
}
export interface UserProfile {
    name: string;
    partnerId: string;
}
export type OrderDataIdentifier = string;
export enum OrderStatus {
    cancelled = "cancelled",
    outForDelivery = "outForDelivery",
    pickedUp = "pickedUp",
    delivered = "delivered",
    accepted = "accepted",
    returned = "returned"
}
export enum Status {
    active = "active",
    inactive = "inactive"
}
export enum Variant_cod_online {
    cod = "cod",
    online = "online"
}
export enum VehicleType {
    car = "car",
    van = "van",
    truck = "truck",
    bike = "bike"
}
export interface backendInterface {
    addCancellation(cancellation: CancellationData): Promise<void>;
    addEarnings(earnings: EarningsData): Promise<void>;
    addOrder(orderData: OrderData): Promise<void>;
    addPartner(profile: PartnerData): Promise<void>;
    addReturn(returnData: ReturnData): Promise<void>;
    getAllPartners(): Promise<Array<PartnerData>>;
    getAvailableOrders(): Promise<Array<OrderData>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCancellations(partnerId: string): Promise<Array<CancellationData>>;
    getEarnings(partnerId: string): Promise<Array<EarningsData>>;
    getOrder(orderId: OrderDataIdentifier): Promise<OrderData>;
    getOrderCountByType(): Promise<Array<[string, bigint]>>;
    getPartner(partnerId: PartnerDataIdentifier): Promise<PartnerData>;
    getPartnerOrders(partnerId: string): Promise<Array<OrderData>>;
    getReturns(partnerId: string): Promise<Array<ReturnData>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    grantAdmin(target: Principal): Promise<void>;
    registerUser(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: OrderDataIdentifier, newStatus: OrderStatus): Promise<void>;
    updatePartnerDocuments(partnerId: PartnerDataIdentifier, newDocuments: Array<DocumentRef>): Promise<void>;
}
