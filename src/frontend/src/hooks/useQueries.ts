import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ── Local type definitions (backend interface is empty) ──────────────────────

export interface UserProfile {
  name?: string;
  partnerId?: string;
}

export enum OrderStatus {
  accepted = "accepted",
  pickedUp = "pickedUp",
  outForDelivery = "outForDelivery",
  delivered = "delivered",
  cancelled = "cancelled",
}

export enum Variant_cod_online {
  cod = "cod",
  online = "online",
}

export interface OrderData {
  id: string;
  status: OrderStatus;
  createdAt: bigint;
  updatedAt: bigint;
  orderType: string;
  partnerId: string;
  charges: number;
}

export interface EarningsData {
  createdAt: bigint;
  partnerId: string;
  paymentType: Variant_cod_online;
  amount: number;
  orderId?: string;
}

export interface CancellationData {
  orderId: string;
  partnerId: string;
  reason: string;
  charge?: number;
  createdAt: bigint;
}

// ── React Query hooks ─────────────────────────────────────────────────────────

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) return;
      return profile;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useAvailableOrders() {
  const { actor, isFetching } = useActor();
  return useQuery<OrderData[]>({
    queryKey: ["availableOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return [];
    },
    enabled: !isFetching,
  });
}

export function usePartnerOrders(partnerId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderData[]>({
    queryKey: ["partnerOrders", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return [];
      return [];
    },
    enabled: !isFetching && !!partnerId,
  });
}

export function useOrder(orderId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderData | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor) return null;
      return null;
    },
    enabled: !isFetching && !!orderId,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      orderId,
      status,
    }: { orderId: string; status: OrderStatus }) => {
      if (!actor) return;
      return { orderId, status };
    },
    onSuccess: (_, { orderId }) => {
      qc.invalidateQueries({ queryKey: ["order", orderId] });
      qc.invalidateQueries({ queryKey: ["availableOrders"] });
      qc.invalidateQueries({ queryKey: ["partnerOrders"] });
    },
  });
}

export function useEarnings(partnerId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<EarningsData[]>({
    queryKey: ["earnings", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return [];
      return [];
    },
    enabled: !isFetching && !!partnerId,
  });
}

export function useAddCancellation() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cancellation: CancellationData) => {
      if (!actor) return;
      return cancellation;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerOrders"] });
    },
  });
}
