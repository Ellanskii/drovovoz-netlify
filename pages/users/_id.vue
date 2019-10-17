<template>
	<div>
		<h1>{{ user.name }}</h1>
	</div>
</template>

<script>
export default {
	async asyncData({ params, error, payload }) {
		if (payload) {
			return { user: payload }
		} else {
			return { user: window.__NUXT__.data[0]}
		}
	},
	zalupa: (window.__NUXT__ = {
		layout: 'default',
		data: [
			{
				user: {
					id: 2,
					name: 'Ervin Howell',
					username: 'Antonette',
					email: 'Shanna@melissa.tv',
					address: {
						street: 'Victor Plains',
						suite: 'Suite 879',
						city: 'Wisokyburgh',
						zipcode: '90566-7771',
						geo: { lat: '-43.9509', lng: '-34.4618' }
					},
					phone: '010-692-6593 x09125',
					website: 'anastasia.net',
					company: {
						name: 'Deckow-Crist',
						catchPhrase: 'Proactive didactic contingency',
						bs: 'synergize scalable supply-chains'
					}
				}
			}
		],
		error: null,
		serverRendered: !0
	})
}
</script>
