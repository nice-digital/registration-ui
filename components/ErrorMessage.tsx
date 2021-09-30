import React from "react";
import { Field } from "react-final-form";
import { Alert } from "@nice-digital/nds-alert";

type ErrorMessageProps = {
	name: string;
    message: string;
	children?: React.ReactNode;
};

export const ErrorMessage = ({ name, message, children }: ErrorMessageProps): React.ReactElement => (
    <Field
        name={name}
        subscription={{ touched: true, error: true }}
        render={({ meta: { touched, error } }): React.ReactElement => (
            <>
                {(touched && error) ? (
                    <>
                        <Alert type="error">
                            {children ? (
                                children
                            ) : (
                                <>
                                    <h2>Error</h2>
                                    <p>{message}</p>
                                </>
                            )}
                        </Alert>
                    </>
                ) : null }
            </>            
        )}
    />
);
