enum NodeLinkState { online, waiting, offline }

class NodeStatus {
  const NodeStatus({
    required this.slot,
    required this.state,
    required this.observations,
  });

  final int slot;
  final NodeLinkState state;
  final int observations;

  String get label => 'Scanner $slot';

  String get summary => switch (state) {
        NodeLinkState.online => '$observations observations',
        NodeLinkState.waiting => 'Waiting for coordinator',
        NodeLinkState.offline => 'Offline',
      };
}
