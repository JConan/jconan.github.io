---
title: 'Migration vers Svelte 5 : Guide Complet'
description: 'Apprenez à migrer votre projet Svelte 4 vers Svelte 5 avec les runes, couvrant les changements majeurs et les bonnes pratiques'
date: '2024-03-15'
author: 'Johan Conan'
tags: ['Svelte', 'Migration', 'Développement Web', 'Runes']
category: 'Développement Web'
featured: true
published: true
excerpt: 'Guide étape par étape pour migrer de Svelte 4 vers Svelte 5, couvrant les runes, les changements majeurs et les bonnes pratiques pour le développement Svelte moderne.'
readingTime: 8
translation_id: 'svelte-5-migration-2024'
---

# Migration vers Svelte 5 : Guide Complet

Svelte 5 introduit des changements significatifs avec le nouveau système de runes, apportant une réactivité améliorée et une meilleure expérience développeur. Ce guide vous accompagnera dans le processus de migration de Svelte 4 vers Svelte 5.

## Changements Clés dans Svelte 5

### 1. Système de Runes

Le plus grand changement est l'introduction des runes pour la gestion d'état réactive.

#### Gestion d'État

```typescript
// Svelte 4
let count = 0;
$: doubled = count * 2;

// Svelte 5
let count = $state(0);
let doubled = $derived(count * 2);
```

#### Props

```typescript
// Svelte 4
export let title;
export let description = 'Description par défaut';

// Svelte 5
const { title, description = 'Description par défaut' } = $props();
```

#### Gestion d'Événements

```svelte
<!-- Svelte 4 -->
<button on:click={handleClick}>Cliquez-moi</button>

<!-- Svelte 5 -->
<button onclick={handleClick}>Cliquez-moi</button>
```

### 2. Des Slots aux Children

```svelte
<!-- Svelte 4 -->
<div>
  <slot></slot>
</div>

<!-- Svelte 5 -->
<script>
  const { children } = $props();
</script>

<div>
  {@render children?.()}
</div>
```

## Étapes de Migration

### Étape 1 : Mettre à Jour les Dépendances

```bash
pnpm add svelte@5 @sveltejs/kit@latest
pnpm add -D @sveltejs/vite-plugin-svelte@latest
```

### Étape 2 : Convertir l'État vers les Runes

Remplacer les déclarations réactives par `$state` et `$derived` :

```typescript
// Avant
let items = [];
let filteredItems = [];
$: filteredItems = items.filter((item) => item.active);

// Après
let items = $state([]);
let filteredItems = $derived(items.filter((item) => item.active));
```

### Étape 3 : Mettre à Jour l'Utilisation des Props

```typescript
// Avant
export let data;
export let optional = 'défaut';

// Après
const { data, optional = 'défaut' } = $props();
```

### Étape 4 : Remplacer les Slots par Children

```svelte
<!-- Avant -->
<Card>
  <slot name="header" slot="header">En-tête par Défaut</slot>
  <slot>Contenu par défaut</slot>
</Card>

<!-- Après -->
<script>
  const { header, children } = $props();
</script>

<Card>
  {@render header?.() ?? 'En-tête par Défaut'}
  {@render children?.() ?? 'Contenu par défaut'}
</Card>
```

### Étape 5 : Mettre à Jour les Gestionnaires d'Événements

```svelte
<!-- Avant -->
<input on:input={handleInput} on:change={handleChange} />

<!-- Après -->
<input oninput={handleInput} onchange={handleChange} />
```

## Bonnes Pratiques

### 1. Utiliser TypeScript pour une Meilleure Sécurité de Type

```typescript
interface Props {
	title: string;
	items: Item[];
	onSelect?: (item: Item) => void;
}

const { title, items, onSelect } = $props<Props>();
```

### 2. Préférer $derived à $effect

```typescript
// Bon - déclaratif
let total = $derived(items.reduce((sum, item) => sum + item.price, 0));

// À éviter - impératif
let total = $state(0);
$effect(() => {
	total = items.reduce((sum, item) => sum + item.price, 0);
});
```

### 3. Utiliser $effect Uniquement pour les Effets de Bord

```typescript
// Bon - effet de bord
$effect(() => {
	document.title = `${title} - Mon App`;
});

// À éviter - valeur dérivée
$effect(() => {
	displayName = `${firstName} ${lastName}`;
});
```

## Pièges Courants

### 1. Oublier de Déstructurer les Props

```typescript
// Incorrect
export let data;

// Correct
const { data } = $props();
```

### 2. Utiliser $effect pour des Valeurs Dérivées

```typescript
// Incorrect
let fullName = $state('');
$effect(() => {
	fullName = `${firstName} ${lastName}`;
});

// Correct
let fullName = $derived(`${firstName} ${lastName}`);
```

### 3. Ne Pas Gérer les Children Optionnels

```svelte
<!-- Incorrect -->
{@render children()}

<!-- Correct -->
{@render children?.()}
```

## Tester Votre Migration

### Tests Unitaires

```typescript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MonComposant from './MonComposant.svelte';

describe('MonComposant', () => {
	it("s'affiche avec les props Svelte 5", () => {
		render(MonComposant, {
			props: { title: 'Titre Test' }
		});

		expect(screen.getByText('Titre Test')).toBeInTheDocument();
	});
});
```

### Tests E2E

```typescript
import { test, expect } from '@playwright/test';

test('le composant fonctionne après migration', async ({ page }) => {
	await page.goto('/');

	await expect(page.getByRole('button')).toBeVisible();
	await page.getByRole('button').click();

	await expect(page.getByText('Mis à jour')).toBeVisible();
});
```

## Conclusion

Migrer vers Svelte 5 apporte des bénéfices significatifs :

- **Meilleures Performances** : Système de réactivité amélioré
- **DX Améliorée** : APIs plus intuitives avec les runes
- **Sécurité de Type** : Meilleure intégration TypeScript
- **Pérenne** : Aligné avec les standards web modernes

Le processus de migration nécessite une attention particulière au nouveau système de runes, mais l'expérience développeur améliorée et les performances en valent la peine.

Prenez votre temps avec la migration, testez minutieusement, et profitez des capacités améliorées de Svelte 5 !
