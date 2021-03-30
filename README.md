# react-bloc
Implementation of flutters bloc pattern in react app based on [BloC v1.0.0](https://github.com/felangel/bloc/releases/tag/bloc-v1.0.0)
## How does it work

![image1](https://github.com/CukierPo2zl/react-bloc/blob/main/images/howdoesitwork.png)

### Comparison of the Bloc class in the official version and my implementation
[bloc.dart](https://github.com/felangel/bloc/commit/f621afaff637d7f841322773aacf80e6eda1e67b#diff-6e17ec6e2ac22f2c8ff0675532e214c13a9f254daefa846fbb2397371f9db053)
```dart
abstract class Bloc<Event, State> extends Stream<State> implements Sink<Event> {
  final PublishSubject<Event> _eventSubject = PublishSubject<Event>();
  BehaviorSubject<State> _stateSubject;
  /// Returns the current [State] of the [Bloc].
  State get state => _stateSubject.value;
  
  /// Returns the [State] before any [Event]s have been `added`.
  State get initialState;
  
  /// Returns whether the `Stream<State>` is a broadcast stream.
  bool get isBroadcast => _stateSubject.isBroadcast;
  
  Bloc() {
  _stateSubject = BehaviorSubject<State>.seeded(initialState);
  _bindStateSubject();
  }
  ...
 }
```
[bloc.ts](https://github.com/CukierPo2zl/react-bloc/blob/main/react-bloc/src/bloc/bloc.tsx)
```typescript
abstract class Bloc<BlocEvent, BlocState> {
  private _events:BehaviorSubject<any> = new BehaviorSubject<any>(null)
  private _states: BehaviorSubject<BlocState>
  
  protected currentState: BlocState
  public initialState: BlocState
  public subject: Observable<BlocState>
  
  constructor(initialState: BlocState) {
    this.currentState = this.initialState = initialState
    this._states = new BehaviorSubject<BlocState>(initialState)
    this.subject = this._states
    
    this._events.subscribe((event) => {
      this.dispatchEvent(event)
    });
  }
  ...
}
```
## Authentication bloc
![diagram1](https://github.com/CukierPo2zl/react-bloc/blob/main/images/diagram1.png)

### Authentication state lifecycle
1. Create bloc variable with default authentication state
```js
const bloc = new AuthenticationBloc(new AuthenticationUninitialized())
```
2. Bloc takes initial event
```js
authBloc.current.add(new AppStarted())
```
3. Bloc checks if the user has a valid auth token
  * YES - `AuthenticationAuthenticated`
  * NO - `AuthenticationUnauthenticated`

## Factory method
![diagram2](https://github.com/CukierPo2zl/react-bloc/blob/main/images/diagram2.png)
