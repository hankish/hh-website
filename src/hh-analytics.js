export default class HhAnalytics {

  static trackCardExpansion(cardLabel) {
    ga('send', 'event', 'Card', 'Expand', cardLabel);
  }

  static trackCardCollapse(cardLabel) {
    ga('send', 'event', 'Card', 'Collapse', cardLabel);
  }

  static trackDialogOpen(dialogLabel) {
    ga('send', 'event', 'Dialog', 'Open', dialogLabel);
  }

}
