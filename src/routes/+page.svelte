<script lang="ts">
	import MaltLogo from '$lib/assets/icons/malt-logo.svelte';
	import ConstructionImage from '$lib/assets/under-construction.png?w=1184&h=888&format=webp&meta&imagetools';
	import Icon from '@iconify/svelte';
</script>

<div class="card">
	<div class="card-header">
		<p class="card-header-title">Welcome to My Portfolio and Tech Blog!</p>
	</div>

	<div class="card-image">
		<figure class="image is-4by3">
			<img src={ConstructionImage} alt="under construction" />
		</figure>
	</div>

	<div class="card-content content">
		<p>
			Greetings, fellow tech enthusiasts, clients, and curious minds! You’ve landed at the right
			place to explore my work, thoughts, and innovations in the world of technology. Whether you're
			here to check out my portfolio or read my tech blog, I'm thrilled to have you. site
		</p>
		<p>
			Please note that this is currently under construction as I fine-tune it to provide you with an
			engaging and informative experience. Your patience is appreciated during this phase. In the
			meantime, feel free to connect with me on <a href="https://www.malt.fr/profile/johanchan"
				><span class="malt"><MaltLogo /></span> Malt.fr</a
			>
			/
			<a href="https://www.linkedin.com/in/johan-chan/" target="_blank"
				><Icon icon="hugeicons:linkedin-02" /> LinkedIn</a
			>
			/
			<a href="https://github.com/JConan" target="_blank">
				<Icon icon="mynaui:brand-github" />GitHub</a
			> . Stay tuned for exciting updates and fresh content coming soon!
		</p>

		<p class="time"><time datetime="2024-7-23">23 Jul 2024</time></p>
	</div>
</div>

<style lang="postcss">
	p.time {
		text-align: right;
	}
</style>
