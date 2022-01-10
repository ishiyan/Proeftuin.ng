# Proeftuin.ng

## Projects in this monorepo

| Project | Description |
| ------- | ----------- |
| `ex01a` | [A responsive navbar using a Flex Layout: part 1](https://zoaibkhan.com/blog/create-a-responsive-toolbar-in-angular-using-flex-layout/) |
| `ex01b` | [A responsive navbar using a Flex Layout: part 2](https://zoaibkhan.com/blog/create-a-responsive-toolbar-in-angular-using-flex-layout/) |
| `ex02`  | [A responsive sidebar menu with Angular Material](https://zoaibkhan.com/blog/create-a-responsive-sidebar-menu-with-angular-material/) |
| `ex03`  | [A responsive card grid using a Flex Layout](https://zoaibkhan.com/blog/create-a-responsive-card-grid-in-angular-using-flex-layout-part-1/) |
| `ex03b` | [Fastest way to make a responsive card grid with CSS](https://zoaibkhan.com/blog/fastest-way-to-make-a-responsive-card-grid-with-css/) |
| `ex04`  | [A responsive pure CSS masonry layout](https://codepen.io/airen/pen/jmEzEm) |
| `ex05a` | [A multi-select chips component based on Angular Material](https://zoaibkhan.com/blog/create-a-multi-select-chips-component-with-angular-material/) |
| `ex05b` | [Angular Material multi-select chips](https://stackblitz.com/edit/angular-ivy-fo2gjf?file=src%2Fapp%2Fapp.component.html) |
| `ex06`  | [Angular Material Dark Mode](https://zoaibkhan.com/blog/angular-material-dark-mode-in-3-steps/) |
| `ex07`  | [Truncate multiple line text in Angular](https://zoaibkhan.com/blog/truncate-multiple-line-text-in-angular-like-a-pro/) |

## Updating

Install latest tools, run `ng update`, run `ncu`, run `npm install`.

```bash
sudo npm install -g @angular/cli@latest
sudo npm install -g npm-check-updates@latest
sudo npm install -g sass@latest
npm list -g

# This will give an overview
ng update
# This will do an actual update of specified packages
# Use an optional `--force` switch if something is not compatible
ng update --force @angular/cli @angular/core @angular-eslint/schematics @angular/material @angular/cdk

# This will show updates for the rest of packages
ncu
# Now edit `package.json` manually and do `npm install`
npm install
```

- Run `prod.cmd`.
- Go to the `src/themes` and run `build_themes_compressed.cmd`.
- Run `prod_notes.cmd`

## Add a new application project to the monorepo

From the workspace folder, execute the following. Read about the [multirepo file structure](https://angular.io/guide/file-structure#multiple-projects) and [ng generate](https://angular.io/cli/generate).

```bash
ng generate application ex01 --prefix=ex01 --minimal --routing=false --style=scss --inline-style=false --inline-template=false --skip-tests=true --interactive=false --dry-run=true
ng generate component responsive-toolbar --project=ex01
ng generate interface responsive-toolbar/menu-item interface --project=ex01


# Adding a study example application
ng generate application myapp --prefix=myapp --minimal --routing=false --style=scss --inline-style=false --inline-template=false --skip-tests=true --interactive=false --dry-run=true

# Adding a real application
ng generate application myapp --style=scss --routing=true --prefix=myapp --strict=false

ng generate component feature1/first --export --prefix=myapp --style=scss --project=myapp

ng generate service feature1/second --project=myapp

ng serve myapp
```


