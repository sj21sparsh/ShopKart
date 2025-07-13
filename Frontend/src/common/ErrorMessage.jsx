import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong" }) => {
    return (
        <div className="px-4 flex justify-center items-center min-h-[50vh]">
            <div className="flex text-center items-center justify-center gap-10 text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-md font-medium">
                <AlertTriangle className="w-15 h-15 text-red-600" />
                <span>{message}</span>
            </div>
        </div>
    );
};

export default ErrorMessage;
