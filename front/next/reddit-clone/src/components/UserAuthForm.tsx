"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React, { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
	const [isLoading, setIsLoading] = useState(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn("google");
		} catch (error) {
			// toast notification
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className={cn("flex justify-center", className)} {...props}>
			<Button onClick={loginWithGoogle} isLoading={isLoading} size="sm" className="w-full">
				{isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
				Google
			</Button>
		</div>
	);
};

export default UserAuthForm;
