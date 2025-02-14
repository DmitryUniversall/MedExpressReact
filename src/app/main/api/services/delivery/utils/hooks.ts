import { useQuery } from "@tanstack/react-query";
import { fetchUserDeliveryOrdersAPICall } from "../service.ts";

export const useDeliveryOrders = () => {
    return useQuery({
        queryKey: [ 'deliveryOrders' ],
        queryFn: fetchUserDeliveryOrdersAPICall,
    });
};
