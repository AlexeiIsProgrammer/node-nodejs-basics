import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __relative = (relativePath, pathname) => path.join(dirname(fileURLToPath(relativePath)), pathname || '');

export default __relative;