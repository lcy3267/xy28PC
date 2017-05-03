import dva from 'dva';
import './index.html';
import './index.css';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    console.error(e);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/bet'));
app.model(require('./models/lottery'));
app.model(require('./models/user'));
app.model(require('./models/recharge'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
