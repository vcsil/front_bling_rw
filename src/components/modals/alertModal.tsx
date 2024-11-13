/* eslint-disable react/prop-types */
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertModalProps {
    title: string;
    description: string;
    show: boolean;
    setShow?: React.Dispatch<React.SetStateAction<boolean>>;
    onClick?: () => void;
}

export interface AlertModalT extends JSX.Element {
    type: unknown;
    key: string | null;
    props: AlertModalProps;
}

export default function AlertModal({ title, description, show, setShow, onClick }: AlertModalProps): JSX.Element {
    return (
        <AlertDialog open={show}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {setShow ? (
                        <AlertDialogCancel onClick={() => setShow(!show)}>Cancel</AlertDialogCancel>
                    ) : (
                        <AlertDialogCancel onClick={onClick}>Cancel</AlertDialogCancel>
                    )}
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
