import { useParams } from "react-router";
import { useProductDetails } from "../hooks/use-product-details/use-product-details";
import { DetailsLayout } from "../components/details-layout/details-layout";

export const DetailsPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useProductDetails(id);

  return <DetailsLayout product={data} isLoading={isLoading} />;
};
