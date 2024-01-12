define([
  'jquery',
  'underscore',
  'knockout',
  'knockout-mapping',
  'arches',
  'templates/views/viewmodels/workflow-builder-config.htm'
], function ($, _, ko, koMapping, arches, template) {
  const WorkflowBuilderConfig = function (params) {
    _.extend(this, params);

    this.workflowName = params?.workflowName || '';

    this.init = () => {
      console.log('workflow-builder-config: ', params);
    };

    this.init();
  };

  ko.components.register('workflow-builder-config', {
    template: template,
    viewModel: WorkflowBuilderConfig
  });

  return WorkflowBuilderConfig;
});
