
import h from 'virtual-dom/h'
import Foo from './foo.js'


export default (state) => {

  var out = (
    <main>
      <h1>Minimalist test</h1>
      <h3>state.foo: {state.foo}</h3>
      <div>
        <Foo />
      </div>
    </main>
  )

  return out;
}

