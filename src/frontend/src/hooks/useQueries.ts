import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CancellationData,
  EarningsData,
  OrderData,
  UserProfile,
} from "../backend";
import type { OrderStatus } from "../backend";
import { useActor } from "./useActor";

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCallerUserProfile(profile);
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
      return actor.getAvailableOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePartnerOrders(partnerId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderData[]>({
    queryKey: ["partnerOrders", partnerId],
    queryFn: async () => {
      if (!actor || !partnerId) return [];
      return actor.getPartnerOrders(partnerId);
    },
    enabled: !!actor && !isFetching && !!partnerId,
  });
}

export function useOrder(orderId: string) {
  const { actor, isFetching } = useActor();
  return useQuery<OrderData>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.getOrder(orderId);
    },
    enabled: !!actor && !isFetching && !!orderId,
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
      if (!actor) throw new Error("No actor");
      return actor.updateOrderStatus(orderId, status);
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
      return actor.getEarnings(partnerId);
    },
    enabled: !!actor && !isFetching && !!partnerId,
  });
}

export function useAddCancellation() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (cancellation: CancellationData) => {
      if (!actor) throw new Error("No actor");
      return actor.addCancellation(cancellation);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerOrders"] });
    },
  });
}
