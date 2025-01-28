import { cn } from "@/lib/utils";
import { ProductListT } from "@/pages/Products/types";

interface PriceProps {
    amount: string;
    className?: string;
    currencyCode: string;
    currencyCodeClassName?: string;
}

function Price({ amount, className, currencyCode = "BRL", currencyCodeClassName }: PriceProps & React.ComponentProps<"p">) {
    return (
        <p suppressHydrationWarning={true} className={className}>
            {`${new Intl.NumberFormat(undefined, {
                style: "currency",
                currency: currencyCode,
                currencyDisplay: "narrowSymbol",
            }).format(parseFloat(amount))}`}
            <span className={cn("ml-1 inline", currencyCodeClassName)}>{`${currencyCode}`}</span>
        </p>
    );
}

function ProductQuantity({ valueQuantity, productName }: { valueQuantity: number | string; productName?: string }) {
    let colorBlock = "";
    if (productName) {
        colorBlock = productName.toLocaleLowerCase().split("cor:")[1];
    }

    return (
        <div
            className={cn(
                "w-full flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white",
                {
                    "bg-gray-400/70 dark:bg-gray-400/70": colorBlock === "prata",
                },
                {
                    "bg-yellow-400/70 dark:bg-yellow-400/70 dark:text-black": colorBlock === "dourado",
                },
            )}
            title={colorBlock ? colorBlock[0].toLocaleUpperCase() + colorBlock.slice(1) : undefined}
        >
            <h3 className="mx-2 line-clamp-2 flex-grow leading-none tracking-tight text-center w-full">{valueQuantity}</h3>
        </div>
    );
}

interface LabelProps {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
    quantity: number;
    productChildren: ProductListT[];
}

const Label = ({ title, amount, currencyCode, position = "bottom", quantity, productChildren }: LabelProps) => {
    return (
        <div
            className={cn("absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label", {
                "lg:px-20 lg:pb-[35%]": position === "center",
            })}
        >
            <div>
                <div className="w-14 flex-row space-y-2 mb-2">
                    {productChildren.length > 0 ? (
                        productChildren.map((product, idx) => {
                            if (idx < 4) {
                                return <ProductQuantity key={idx} valueQuantity={Number(product.saldo)} productName={product.nome} />;
                            } else if (idx === 4) {
                                return <ProductQuantity key={idx} valueQuantity={"..."} />;
                            }
                        })
                    ) : (
                        <ProductQuantity valueQuantity={quantity} />
                    )}
                </div>
                <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{title}</h3>
                    <Price
                        className="flex-none rounded-full bg-rw3 p-2 text-white"
                        amount={amount}
                        currencyCode={currencyCode}
                        currencyCodeClassName="hidden @[275px]/label:inline"
                    />
                </div>
            </div>
        </div>
    );
};

interface GridTileImageProps {
    isInteractive?: boolean;
    active?: boolean;
    label?: {
        title: string;
        amount: string;
        currencyCode: string;
        position?: "bottom" | "center";
    };
    alt: string;
    quantity: number;
    productChildren: ProductListT[];
}

export function GridTileImage(
    { isInteractive = true, active, label, alt, quantity, productChildren, ...props }: GridTileImageProps,
    // & React.ComponentProps<typeof HTMLImageElement>
) {
    return (
        <div
            className={cn(
                "flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-rw3 dark:bg-black dark:hover:border-rw3",
                {
                    relative: label,
                    "border-2 border-rw3": active,
                    "border-neutral-200 dark:border-neutral-800": !active,
                },
            )}
        >
            {props.src ? (
                <img
                    className={cn("relative h-full w-full object-contain", {
                        "transition duration-300 ease-in-out hover:scale-150": isInteractive,
                    })}
                    {...props}
                    alt={alt}
                />
            ) : null}
            {label ? (
                <Label
                    title={label.title}
                    amount={label.amount}
                    currencyCode={label.currencyCode}
                    position={label.position}
                    quantity={quantity}
                    productChildren={productChildren}
                />
            ) : null}
        </div>
    );
}

function Grid(props: React.ComponentProps<"ul">) {
    return (
        <ul {...props} className={cn("grid grid-flow-row gap-4", props.className)}>
            {props.children}
        </ul>
    );
}

function GridItem(props: React.ComponentProps<"li">) {
    return (
        <li {...props} className={cn("aspect-square transition-opacity", props.className)}>
            {props.children}
        </li>
    );
}

Grid.Item = GridItem;

export { Grid };
