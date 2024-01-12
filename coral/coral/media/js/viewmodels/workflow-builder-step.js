define([
  'jquery',
  'underscore',
  'knockout',
  'knockout-mapping',
  'arches',
  'uuid',
  'templates/views/viewmodels/workflow-builder-step.htm',
  'viewmodels/workflow-builder-card'
], function ($, _, ko, koMapping, arches, uuid, template, WorkflowBuilderCard) {
  const WorkflowBuilderStep = function (params) {
    _.extend(this, params);

    this.title = ko.observable(params?.title || '');
    this.cards = ko.observableArray();
    this.graphId = params?.graphId;

    this.addCard = (cardData) => {
      const cardIndex = this.cards().length;
      const card = new WorkflowBuilderCard({
        title: 'Card ' + (cardIndex + 1),
        componentData: cardData,
        graphId: this.graphId,
        cardId: uuid.generate(),
        parentStep: this
      });
      this.cards().push(card);
      this.cards.valueHasMutated();
    };

    this.removeCardFromStep = (cardId) => {
      this.cards.remove((card) => {
        return card.cardId === cardId;
      });
    };

    this.loadCards = (cards) => {
      cards?.forEach((cardData) => {
        this.addCard(cardData);
      });
    };

    this.titleAsId = ko.computed(() => {
      return this.title().toLowerCase().split(' ').join('-');
    }, this);

    this.getStepData = () => {
      return {
        title: this.title(),
        name: this.titleAsId(),
        required: false,
        workflowstepclass: 'workflow-form-component',
        // informationboxdata: {
        //   heading: '',
        //   text: ''
        // },
        layoutSections: [
          {
            componentConfigs: this.cards().map((card) => card.getComponentData())
          }
        ]
      };
    };

    this.removeStep = () => {
      this.parentWorkflow.removeStepFromWorkflow(this.stepId);
    };

    this.init = () => {
      this.loadCards(params?.cards);
      console.log('uuid: ', uuid.generate());
    };

    this.init();
  };

  ko.components.register('workflow-builder-step', {
    template: template
  });

  return WorkflowBuilderStep;
});