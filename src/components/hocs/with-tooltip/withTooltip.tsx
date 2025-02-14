import { ComponentType, ImgHTMLAttributes, ReactNode, useState } from "react";
import styles from "./withTooltip.module.css"
import clsx from "../../../utils/clsx";

type WithTooltipProps<P> = P & {
    tooltipContent: ReactNode;
};

function withTooltip<P extends object>(WrappedComponent: ComponentType<P>): ComponentType<WithTooltipProps<P>> {

    return function ({ tooltipContent, ...props }: WithTooltipProps<P>) {
        const [isHidden, setIsHidden] = useState(true);

        return (
            <div
                className={clsx(styles.wrapper)}
                onMouseOver={() => setIsHidden(false)}
                onMouseLeave={() => setIsHidden(true)}
            >
                <WrappedComponent {...props as P} />
                <div className={clsx(styles.tooltip, isHidden && styles.hidden)}>
                    {tooltipContent}
                </div>
            </div>
        )
    }
}

export const WithTooltipImg = withTooltip((props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />)