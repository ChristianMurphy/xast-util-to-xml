import test from 'tape'
import {u} from 'unist-builder'
import {toXml} from '../index.js'

test('`doctype`', (t) => {
  t.deepEqual(
    // @ts-expect-error runtime.
    toXml(u('doctype')),
    '<!DOCTYPE>',
    'should serialize doctypes without `name`'
  )

  t.deepEqual(
    toXml(u('doctype', {name: 'html'})),
    '<!DOCTYPE html>',
    'should serialize doctypes with `name`'
  )

  t.deepEqual(
    toXml(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD XHTML 1.0 Transitional//EN'
      })
    ),
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN">',
    'should serialize doctypes with a public identifier'
  )

  t.deepEqual(
    toXml(u('doctype', {name: 'html', system: 'about:legacy-compat'})),
    '<!DOCTYPE html SYSTEM "about:legacy-compat">',
    'should serialize doctypes with a system identifier'
  )

  t.deepEqual(
    toXml(
      u('doctype', {
        name: 'html',
        public: '-//W3C//DTD HTML 4.01//',
        system: 'http://www.w3.org/TR/html4/strict.dtd'
      })
    ),
    '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//" "http://www.w3.org/TR/html4/strict.dtd">',
    'should serialize doctypes with both identifiers'
  )

  t.deepEqual(
    toXml(u('doctype', {name: 'html', public: 'taco"'})),
    '<!DOCTYPE html PUBLIC "taco&#x22;">',
    'should quote smartly (1)'
  )
  t.deepEqual(
    toXml(u('doctype', {name: 'html', public: 'taco"'}), {quoteSmart: true}),
    "<!DOCTYPE html PUBLIC 'taco\"'>",
    'should quote smartly (2)'
  )
  t.deepEqual(
    toXml(u('doctype', {name: 'html', public: '"ta\'co"'}), {quoteSmart: true}),
    '<!DOCTYPE html PUBLIC \'"ta&#x27;co"\'>',
    'should quote smartly (3)'
  )

  t.end()
})
