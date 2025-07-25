"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
	useEffect(() => {
		const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || process.env.CRISP_WEBSITE_ID;
		if (!websiteId) {
			console.warn("CRISP_WEBSITE_ID is not set.");
			return;
		}
		Crisp.configure(websiteId);
	}, []);

	return null;
};
