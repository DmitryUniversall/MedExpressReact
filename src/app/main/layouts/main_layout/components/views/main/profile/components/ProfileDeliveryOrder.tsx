import { FC } from "react";
import { DeliveryOrderLoadedD1, DeliveryOrderStatus } from "../../../../../../../api/services/delivery/models/delivery_order.ts";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";

interface ProfileDeliveryOrderPropsLoading {
    isLoading: true
}

interface ProfileDeliveryOrderPropsLoaded {
    isLoading: false;
    deliveryOrder: DeliveryOrderLoadedD1;
}

type ProfileDeliveryOrderProps = ProfileDeliveryOrderPropsLoading | ProfileDeliveryOrderPropsLoaded;


const ProfileDeliveryOrder: FC<ProfileDeliveryOrderProps> = (props: ProfileDeliveryOrderProps) => {
    const { t } = useTranslation(["profile"])

    const getStatusOrderUI = (status: DeliveryOrderStatus) => {
        switch (status) {
            case "arrive_soon":
                return <span className="badge bg-success">{t("profile:order_arrive_soon")}</span>
            case "on_the_way":
                return <span className="badge bg-primary">{t("profile:order_on_the_way")}</span>
            case "packaging":
                return <span className="badge bg-warning">{t("profile:order_packaging")}</span>
        }
    }

    return (
        <>
            <div className="card card-shadow-1 p-3">
                <div className="d-flex flex-column gap-1">
                    {
                        !props.isLoading ? (
                            <h6>
                                <a href="#">{ props.deliveryOrder.product.title }</a>
                            </h6>
                        ) : (
                            <Skeleton height="1.25rem" width="50%"/>
                        )
                    }
                    {
                        !props.isLoading ? (
                            <p className="text-muted mb-4">
                                { props.deliveryOrder.product.description }
                            </p>
                        ) : (
                            <Skeleton height="2.5rem" width="100%"/>
                        )
                    }
                    {
                        !props.isLoading ? (
                            getStatusOrderUI(props.deliveryOrder.status)
                        ) : (
                            <Skeleton height="1.25rem" width="100%"/>
                        )
                    }
                </div>
            </div>
        </>
    )
}


export default ProfileDeliveryOrder;
