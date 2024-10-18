export interface EmailVerificationResult {
	message: string;
	email: string;
	token: string;
	expiresIn: number;
}
