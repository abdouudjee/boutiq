<form
	method="POST"
	action="?/singin"
	class="flex h-full w-full flex-col items-start justify-start gap-4 rounded-md bg-white px-6 py-4 shadow-md"
>
	<div>
		<p class="text-2xl font-medium tracking-wide">Sign in</p>
		<p class="text-sm text-gray-500">Enter your email and password to access your account</p>
	</div>

	<div class="flex w-full flex-col gap-1">
		<label for="email" class="font-medium tracking-wide">Email</label>
		<input
			type="text"
			name="email"
			id="email"
			placeholder="eg. johndoe@gmail.com"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
	</div>
	<div class="flex w-full flex-col gap-1">
		<label for="password" class="font-medium tracking-wider">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="eg. T9v$eX!aR3p@qL7z"
			class="w-full rounded-md border-2 border-gray-300 px-2 py-1 ring-0 focus:border-gray-400 focus:outline-none"
		/>
		<div class="flex w-full items-center justify-end gap-2">
			<a href="/" class="text-blue text-sm underline">Forgot password?</a>
		</div>
	</div>
	<!-- <div class="flex w-full items-center justify-start gap-2">
		<input
			type="checkbox"
			name=""
			id=""
			class="h-4 w-4 rounded-sm border-1 ring-black checked:bg-black"
		/>
		<label for="" class="font-medium">Remember me</label>
	</div> -->
	<button
		type="submit"
		class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-3 text-sm font-medium text-white hover:bg-gray-700 active:scale-95"
		>Sign in</button
	>
	<div class="flex items-center justify-center">
		<p class="text-sm text-gray-500">
			Don't have an account? <a href="/auth/signup" class="text-blue underline">Sign up</a>
		</p>
	</div>
</form>
