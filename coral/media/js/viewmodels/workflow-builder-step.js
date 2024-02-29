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
    this.required = ko.observable(params?.required || false);

    this.addCard = (cardData) => {
      const card = new WorkflowBuilderCard({
        componentData: cardData,
        graphId: this.graphId,
        cardId: cardData?.uniqueInstanceName || uuid.generate(),
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

    this.shiftCard = (cardId, direction) => {
      const targetIndex = this.cards().findIndex((card) => card.cardId === cardId);
      if (targetIndex === -1) return;

      if (direction === 'up' && targetIndex > 0) {
        const temp = this.cards()[targetIndex];
        this.cards()[targetIndex] = this.cards()[targetIndex - 1];
        this.cards()[targetIndex - 1] = temp;
      } else if (direction === 'down' && targetIndex < this.cards().length - 1) {
        const temp = this.cards()[targetIndex];
        this.cards()[targetIndex] = this.cards()[targetIndex + 1];
        this.cards()[targetIndex + 1] = temp;
      } else {
        return;
      }

      this.cards.valueHasMutated();
    };

    this.cardIdx = (cardId) => {
      return ko.computed(() => {
        return this.cards().findIndex((card) => card.cardId === cardId) + 1;
      }, this);
    };

    this.titleAsId = ko.computed(() => {
      return this.title().toLowerCase().split(' ').join('-');
    }, this);

    this.getStepData = () => {
      return {
        title: this.title(),
        name: this.stepId,
        required: false,
        workflowstepclass: 'workflow-form-component',
        required: this.required(),
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
    };

    this.init();
  };

  ko.components.register('workflow-builder-step', {
    template: template
  });

  return WorkflowBuilderStep;
});
