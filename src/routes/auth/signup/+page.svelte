<form
	method="POST"
	action="?/signup"
	class="flex h-full w-full flex-col items-start justify-start gap-4 rounded-md bg-white px-6 py-4 shadow-md"
>
	<div>
		<p class="text-2xl font-medium tracking-wide">Sign up</p>
		<p class="text-sm text-gray-500">Create an account to get started</p>
	</div>
	<div class="flex w-full flex-col gap-1">
		<label for="fullname">Full Name</label>
		<input
			type="text"
			name="fullname"
			id="fullname"
			placeholder="eg. John Doe"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
	</div>

	<div class="flex w-full flex-col gap-1">
		<label for="">Email</label>
		<input
			type="text"
			name="email"
			id="email"
			placeholder="eg. johndoe@gmail.com"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
	</div>
	<div class="flex w-full flex-col gap-1">
		<label for="">Password</label>
		<input
			type="text"
			name="password"
			id="password"
			placeholder="eg. T9v$eX!aR3p@qL7z"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
	</div>

	<div class="flex w-full flex-col gap-1">
		<label for=""> Confirm Password</label>
		<input
			type="text"
			name=""
			id=""
			placeholder="eg. T9v$eX!aR3p@qL7z"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
	</div>
	<button
		type="submit"
		class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-3 text-sm font-medium text-white hover:bg-gray-700 active:scale-95"
		>Create Account</button
	>

	<div class="flex items-center justify-center">
		<p class="text-sm text-gray-500">
			already have an account? <a href="/auth/signin" class="text-blue underline">Sign in</a>
		</p>
	</div>
</form>
