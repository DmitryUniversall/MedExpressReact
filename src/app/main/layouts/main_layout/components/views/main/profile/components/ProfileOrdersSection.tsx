import { FC } from "react";
import ProfileDeliveryOrder from "./ProfileDeliveryOrder.tsx";
import { useTranslation } from "react-i18next";
import { useDeliveryOrders } from "../../../../../../../api/services/delivery/utils/hooks.ts";

const ProfileOrdersSection: FC = () => {
    const { t } = useTranslation([ "common", "profile" ])
    const { data: deliveryOrders, isLoading: isLoading, error: error } = useDeliveryOrders();

    if (error) console.error(error)

    return (
        <div className="card card-shadow-2 rounded-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>{ t("profile:deliveries") }</h5>
                <a href="#">{ t("profile:see_all_delivery_orders") }</a>
            </div>
            <div className="row g-3">
                {
                    !error ? (
                        !isLoading ? (
                            deliveryOrders && deliveryOrders.length != 0 ? (
                                deliveryOrders.map((deliveryOrder, index) => (
                                    <div key={ index } className="col-12 col-md-6">
                                        <ProfileDeliveryOrder isLoading={ false } deliveryOrder={ deliveryOrder }/>
                                    </div>
                                ))
                            ) : (
                                <div className="w-100">
                                    <h3 className="message text-center">{ t("profile:has_no_orders") }</h3>
                                </div>
                            )
                        ) : (
                            [ ...Array(4).keys() ].map(index => (
                                <div key={ index } className="col-12 col-md-6">
                                    <ProfileDeliveryOrder isLoading={ true }/>
                                </div>
                            ))
                        )
                    ) : (
                        <div className="error w-100">
                            <h3 className="message text-danger text-center">{ t("common:unknown_error_occurred") }</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProfileOrdersSection;
