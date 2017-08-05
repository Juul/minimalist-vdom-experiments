
import nodeToVDom from 'vdom-virtualize' // convert DOM node to a vDOM node
//import htmlToVDom from 'html-to-vdom' // convert HTML to vDOM
import vDomToJson from 'vdom-as-json/toJson' // serialize vDOM to JSON
import vDomFromJson from 'vdom-as-json/fromJson' // unserialize vDOM from JSON
import vDomDiff from 'virtual-dom/diff' // calculate diff between tow vDOMs
import vDomSerializePatch from 'vdom-serialized-patch/serialize'
import patchDom from 'vdom-serialized-patch/patch' // patch DOM with vDOM patch


import app from './app.js'

var curVDom;
var curState;

function vDomPatch(data, init) {
  if(data.state) {
    curState = data.state;
  }

  if(data.statePatch) {
    throw new Error("not implemented");
  }

  if(data.vDom) { // replace the entire vDOM
    curVDom = vDomFromJson(data.vDom);
  }

  console.log("got here 0");

  var newVDom = app(curState);

  console.log("got here 1");

  var patch = vDomDiff(curVDom, newVDom);
  curVDom = newVDom;

  return vDomSerializePatch(patch);
}

function appInit() {
  
  console.log("Initializing ");

  var appElement = document.getElementById('app');

  var vDom = vDomToJson(nodeToVDom(appElement));
  
  var domPatch = vDomPatch({vDom, state: {count: 42, foo: 'i am rubber'}}, true);
  console.log(domPatch);

  patchDom(appElement, domPatch);
  
}



appInit();
