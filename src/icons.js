import fontawesome from '@fortawesome/fontawesome';

const icons = [
  require('@fortawesome/fontawesome-free-solid/faCircleNotch'),
  require('@fortawesome/fontawesome-free-solid/faTrophy'),
  require('@fortawesome/fontawesome-free-brands/faGitHub')
];

fontawesome.library.add(...icons);
