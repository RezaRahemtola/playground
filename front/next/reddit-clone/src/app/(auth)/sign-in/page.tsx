import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import Signin from "@/components/Signin";

const page = () => {
	return (
		<div className="absolute inset-0">
			<div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
				<Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "self-start -mt-20")}>
					Home
				</Link>

				<Signin />
			</div>
		</div>
	);
};

export default page;
