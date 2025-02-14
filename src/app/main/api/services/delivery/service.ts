import { axiosClient } from "../../../../core/http/axios_client.ts";
import { DeliveryOrderLoadedD1 } from "./models/delivery_order.ts";


export const fetchUserDeliveryOrdersAPICall = async (): Promise<DeliveryOrderLoadedD1[]> => {
    const { data } = await axiosClient.get('/delivery/orders/');
    return data.data.orders;
};
