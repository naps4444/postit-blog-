import { ThreeDot } from "react-loading-indicators";

export default function LoadingIndicator() {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <ThreeDot
                color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]}
                size="large"
                text=""
                textColor=""
            />
        </div>
    );
}
