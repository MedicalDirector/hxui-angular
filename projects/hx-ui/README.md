# HXUI Angular

An Angular library based on the [HXUI design system](https://hxui.io).

## Installation

```sh
npm i @hxui/angular
```

## Usage

Option 1:
**Import all web component modules** into app module or shared module.

```ts
import { HxUiModule } from '@hxui/angular';

@NgModule({
  imports: [HxUiModule.forRoot()],
})
export class AppModule {}
```

Option 2:
**Import each web component module** that you need individually.

```ts
import { DropdownModule } from '@hxui/angular'

@NgModule({
imports: [DropdownModule.forRoot(), ...]
})
export class AppModule {}
```

**IMPORTANT**
The following structural css needs to be included in the project's style file because the [Material CDK](https://material.angular.io/cdk/categories) has been used as part of this library.

```scss
// Structural css needed for CDK to work correctly
@import '~@angular/cdk/overlay-prebuilt.css';
@import '~@angular/cdk/a11y-prebuilt.css';
@import '~@angular/cdk/text-field-prebuilt.css';
```

## Versions

| @hxui/angular | Angular |
| ------------- | ------- |
| 8.x           | 8.x     |
| 11.x          | 11.x    |
| 13.x          | 13.x    |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
