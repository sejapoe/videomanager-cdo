type CroppedTextProps = {
    chars: number;
    children: string;
};

export const CroppedText = ({chars, children}: CroppedTextProps) => {
    const textLength = chars - 3;

    return (
        children.length > textLength ?
            <span title={children}>
                {children.substring(0, textLength)}...
            </span>
            : children
    )
        ;
};