module.exports = {
	'packages/frontend/**/*.{js,jsx,ts,tsx}': [
		() => 'pnpm --filter frontend typecheck',
		'pnpm --filter frontend lint',
		'pnpm --filter frontend format',
		'git add',
	],
	'packages/backend/**/*.{js,ts}': [
		() => 'pnpm --filter backend typecheck',
		'pnpm --filter backend lint',
		'pnpm --filter backend format',
		'git add',
	],
}
