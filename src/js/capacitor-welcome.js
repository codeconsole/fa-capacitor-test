import { SplashScreen } from '@capacitor/splash-screen';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      FirebaseAnalytics.setCollectionEnabled({enabled: true})
      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <h2>Tiny Demo</h2>
        <p>
          This demo shows how to call Capacitor plugins. Say cheese!
        </p>
        <p>
          <h3>Step 1. Open Firebase > Your Project > Analytics > DebugView</h3>
          <a target="_blank" href="https://console.firebase.google.com/">Firebase Console</a>
        </p>
        <p>
          <h3>Step 2. Click the following and verify the event showed in the DebugView</h3>
          <button class="button" id="log-event">Log Event</button>
        </p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;
      
      self.shadowRoot.querySelector('#log-event').addEventListener('click', async function (e) {
        const platformCap = `${Capacitor.platform[0].toUpperCase()}${Capacitor.platform.slice(1)}`
        FirebaseAnalytics.setScreenName({ screenName: "test", nameOverride: "testScreen"+platformCap});
        FirebaseAnalytics.logEvent({ name: "test_event_"+Capacitor.platform });
        alert(`screen:testScreenand${platformCap} event:test_event_${Capacitor.platform} sent!`)
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
