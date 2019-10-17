<template>
	<div>
		<h1>{{ user.name }}</h1>
	</div>
</template>

<script>
export default {
	async asyncData({ params, error, payload }) {
		if (payload) return { user: payload }
		// else return { user: await backend.fetchUser(params.id) }
	}
}
</script>
