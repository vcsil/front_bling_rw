function checkContainerWidthIsLess(
    containerRef: React.MutableRefObject<null>,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
    minWidth: number,
) {
    // Verfica se o container possui o tamanho necessário
    const handleResize = () => {
        if (containerRef.current) {
            setIsHidden(containerRef.current.offsetWidth <= minWidth);
        }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }

    // Chamar a função uma vez ao montar o componente
    handleResize();

    // Limpar o observer ao desmontar o componente
    return () => {
        if (containerRef.current) {
            resizeObserver.unobserve(containerRef.current);
        }
    };
}

const skeletonClassName = "mb-3 h-4 w-5/6 animate-pulse rounded";
const activeAndTitlesClassName = "bg-neutral-800 dark:bg-neutral-300";
const itemsClassName = "bg-neutral-400 dark:bg-neutral-700";

export { checkContainerWidthIsLess, skeletonClassName, activeAndTitlesClassName, itemsClassName };
