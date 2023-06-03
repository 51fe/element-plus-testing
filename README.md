# Element-plus testing

It's easy to test vue App with vitest and vue test utils, but if the App used a UI library (e.g. element-plus), things will become difficult. Here are some my used samples. If they can be helpful for you, I'll be very happy!

For some reasons, we have to use fake timers. And unluckily, the form validation can't be passed because `formEl.validate()` always returns true.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

# Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run start
```

### Unit Test

```
npm run test
```
