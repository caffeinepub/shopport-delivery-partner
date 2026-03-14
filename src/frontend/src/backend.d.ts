import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export type PartnerDataIdentifier = string;
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
    documents: Array<ExternalBlob>;
    name: string;
    createdAt: Time;
    rating: number;
    phone: string;
}
export interface OrderData {
    id: string;
    status: OrderStatus;
    createdAt: Time;
    orderType: string;
    partnerId: string;
    updatedAt: Time;
    charges: number;
}
export interface EarningsData {
    createdAt: Time;
    partnerId: string;
    paymentType: Variant_cod_online;
    amount: number;
}
export type OrderDataIdentifier = string;
export interface UserProfile {
    name: string;
    partnerId: string;
}
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
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllPartners(): Promise<Array<PartnerData>>;
    getAvailableOrders(): Promise<Array<OrderData>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCancellations(partnerId: string): Promise<Array<CancellationData>>;
    getEarnings(partnerId: string): Promise<Array<EarningsData>>;
    getOrder(orderId: OrderDataIdentifier): Promise<OrderData>;
    getOrderCountByType(): Promise<Array<[string, bigint]>>;
    getPartner(partnerId: PartnerDataIdentifier): Promise<PartnerData>;
    getPartnerOrders(partnerId: string): Promise<Array<OrderData>>;
    getReturns(partnerId: string): Promise<Array<ReturnData>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: OrderDataIdentifier, newStatus: OrderStatus): Promise<void>;
    updatePartnerDocuments(partnerId: PartnerDataIdentifier, newDocuments: Array<ExternalBlob>): Promise<void>;
}
