import { formatMoeda } from "../Dashboard/Dashboard/utils";
import { ProductPhotoProps } from "./types";

export default function ProductPhoto({ imageUrl, productName, price }: ProductPhotoProps): JSX.Element {
    const imageVerify = imageUrl ? imageUrl : "./no-image.svg";

    return (
        <fieldset className="rounded-lg border bg-card p-4 flex flex-col h-full">
            <legend className="-ml-1 px-1 text-sm font-medium">Foto do produto</legend>
            <div className="flex justify-center items-center">
                <img src={imageVerify} alt={productName} className="h-[26rem]" />
            </div>
            <div className="flex justify-between items-center w-full mt-2">
                <span className="text-base">{productName}</span>
                <span className="text-base  ">{formatMoeda(price)}</span>
            </div>
        </fieldset>
    );
}
