# 4.1.0 2020-02-17

- Turn off Ivy (with Angular 9)
- Fixed secluded decorator
- Fixed navLink (href) directive due to attribute order dependency
- Fixed internal data structures to support modern decorator rules
- Added downlevel-ts to support older typescript in apps
- Updated dependencies, tests, UI examples

# 4.0.0 2019-09-24

**Semantically redesigned API:**

- Slice became Unit
- LazySlice became Connector
- Route (stateful) of slice became Spot
- Detached unit became Nearby
- Sliced decorator became Secluded

**Other minor updates:**

- increased useful test coverage
- refactored code base
- improved and updated documentation

# 3.0.2 2019-09-08

- fixed queryParams issue
- updated documentation and deps

# 3.0.1 2019-07-21

- updated documentation
- refactored and reduced api
- added contributors board
- added test commit check


# 3.0.0 2019-06-21

- changed a way of slice connection [BREAKING CHANGE]
- fixed detached connection
- createFeature now returns LazySlice
- changed style guide
- raised the test cover
- updated documentation


# 2.1.3 2019-06-21

- insignificant api changes
- fixed issues with typing of getter functions
- covered with tests all api


# 2.1.2 2019-06-17

- improved documentation
- refactored code


# 2.1.1 2019-06-16

- added new getSlice function (as an alternative to @Sliced decorator)
- refactored code


# 2.1.0 2019-06-14

- added new @Sliced decorator
- created approach to leverage the issues with circular dependencies
- refactored api
- slightly refactored pattern
- updated documentation


# 2.0.0 2019-06-09

- reduced the amount of required boilerplate code
- added new features to API: createNote, createUnion, getHub
- added improvements that accelerate development
- added tests for all creator functions
- added support for recent Angular versions
- completely rewritten documentation
- fixed bugs and inaccuracies
- finish hub management pattern and improved semantics
- updated dependencies


# 1.3.0 2019-05-08

- added new navLinkActive directive
- refactored navigation directives
- fixed bugs and inaccuracies
- updated documentation
- updated dependencies


# 1.2.0 2019-05-01

- added few navigation directives
- added forwardParams fn
- deprecated stateFn and withdrawn from API
- minor fixes and refactoring
- updated documentation
- updated dependencies


# 1.1.1 2019-03-09

- improved reliability and typing
- fixed issues with route names and ids
- added tests to cover entry points
- renamed some API (lazyPath become lazy)
- extended internal API
- other minor changes

# 1.0.1 2019-02-11

- improved an explanation
- updated and fixed readme
- refactored and made functionality clearer


# 1.0.0 2019-02-09

- initial release
