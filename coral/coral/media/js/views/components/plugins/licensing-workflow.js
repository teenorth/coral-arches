define([
  'knockout',
  'arches',
  'viewmodels/editable-workflow',
  'templates/views/components/plugins/default-workflow.htm',
  'views/components/workflows/licensing-workflow/initial-step',
  'views/components/workflows/default-card-util',
  'views/components/workflows/licensing-workflow/license-cover-letter',
  'views/components/workflows/licensing-workflow/license-final-step',
  'views/components/workflows/licensing-workflow/fetch-generated-license-number',
  'views/components/workflows/related-document-upload'
], function (ko, arches, EditableWorkflow, workflowTemplate) {
  return ko.components.register('licensing-workflow', {
    viewModel: function (params) {
      this.componentName = 'licensing-workflow';
      this.stepConfig = [
        {
          title: 'Initialise Excavation License',
          name: 'init-step',
          required: true,
          informationboxdata: {
            heading: 'Important Information',
            text: 'Please note that it could take up to a minute to complete the initialisation for the License application. If something goes wrong during the process an error will be displayed to you.'
          },
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'initial-step',
                  uniqueInstanceName: 'app-id',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '991c3c74-48b6-11ee-85af-0242ac140007',
                    hiddenNodes: ['991c4340-48b6-11ee-85af-0242ac140007']
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Application Details',
          name: 'app-details-step',
          required: false,
          workflowstepclass: 'workflow-form-component',
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'site-name',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: '4a7bba1d-9938-11ea-86aa-f875a44e0e11',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    hiddenNodes: [
                      '4a7bba20-9938-11ea-92e7-f875a44e0e11',
                      '4a7bba21-9938-11ea-8f0f-f875a44e0e11'
                    ],
                    labels: [['Activity Name', 'Site Name']]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'planning-ref',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'e7d695ff-9939-11ea-8fff-f875a44e0e11',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    tileid: "['init-step']['app-id'][0]['resourceid']['actSysRefTileId']",
                    hiddenNodes: [
                      'e7d69603-9939-11ea-9e7f-f875a44e0e11',
                      'e7d69602-9939-11ea-b514-f875a44e0e11'
                    ],
                    labels: [['Legacy ID', 'Planning Reference']]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'cm-ref',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: '589d38f9-edf9-11eb-90f5-a87eeabdefba',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    hiddenNodes: [
                      '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                      '589d4dcc-edf9-11eb-ae7b-a87eeabdefba',
                      '589d4dca-edf9-11eb-83ea-a87eeabdefba'
                    ],
                    prefilledNodes: [
                      // Source set to Heritage Environment Record Number
                      [
                        '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                        '19afd557-cc21-44b4-b1df-f32568181b2c'
                      ]
                    ],
                    labels: [['Cross Reference', 'CM Reference']]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'license-no',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '280b6cfc-4e4d-11ee-a340-0242ac140007',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']",
                    hiddenNodes: [
                      '280b78fa-4e4d-11ee-a340-0242ac140007',
                      '280b7a9e-4e4d-11ee-a340-0242ac140007',
                      '280b7238-4e4d-11ee-a340-0242ac140007'
                    ],
                    labels: [['Cross Reference', 'License Number']]
                  }
                },
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'app-contacts',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '6d290832-5891-11ee-a624-0242ac120004',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                },
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'app-dates',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '05f6b846-5d49-11ee-911e-0242ac130003',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                },
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'app-notes',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '4f0f655c-48cf-11ee-8e4e-0242ac140007',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'excavation-type',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '6e071042-5d45-11ee-88b0-0242ac120008',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Geospatial Details',
          name: 'geospaital-step',
          required: false,
          workflowstepclass: 'workflow-form-component',
          informationboxdata: {
            heading: 'Location Details'
          },
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'geometry-info',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'a541560c-f121-11eb-aa92-a87eeabdefba',
                    // hiddenNodes: [
                    //   'a541922b-f121-11eb-a081-a87eeabdefba',
                    //   'a5419222-f121-11eb-8b1f-a87eeabdefba',
                    //   'a541e02a-f121-11eb-83b2-a87eeabdefba',
                    //   'a541e02d-f121-11eb-b36f-a87eeabdefba'
                    // ],
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    parenttileid: "['init-step']['app-id'][0]['actLocTileId']"
                  }
                }
                // {
                //   componentName: 'default-card',
                //   uniqueInstanceName: 'grid-info',
                //   tilesManaged: 'one',
                //   parameters: {
                //     graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                //     nodegroupid: 'a5416b43-f121-11eb-b691-a87eeabdefba',
                //     // hiddenNodes: [
                //     //   'a541922b-f121-11eb-a081-a87eeabdefba',
                //     //   'a5419222-f121-11eb-8b1f-a87eeabdefba',
                //     //   'a541e02a-f121-11eb-83b2-a87eeabdefba',
                //     //   'a541e02d-f121-11eb-b36f-a87eeabdefba'
                //     // ],
                //     renderContext: 'workflow',
                //     resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                //     parenttileid: "['init-step']['app-id'][0]['actLocTileId']"
                //   }
                // }
              ]
            }
          ]
        },
        {
          title: 'Location Details',
          name: 'location-step',
          workflowstepclass: 'workflow-form-component',
          required: false,
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'address-info',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'a5416b3d-f121-11eb-85b4-a87eeabdefba',
                    hiddenNodes: [
                      'a541922b-f121-11eb-a081-a87eeabdefba',
                      'a5419222-f121-11eb-8b1f-a87eeabdefba',
                      'a541e02a-f121-11eb-83b2-a87eeabdefba',
                      'a541e02d-f121-11eb-b36f-a87eeabdefba'
                    ],
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    parenttileid: "['init-step']['app-id'][0]['actLocTileId']"
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'location-names',
                  tilesManaged: 'many',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'a5416b46-f121-11eb-8f2d-a87eeabdefba',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    parenttileid: "['init-step']['app-id'][0]['actLocTileId']",
                    hiddenNodes: ['a541922b-f121-11eb-a081-a87eeabdefba'],
                    labels: [
                      ['Area Name', 'Additional Area Name'],
                      ['Area Type', 'Area Type For Additional Name']
                    ]
                  }
                },
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'location-description',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'a5416b40-f121-11eb-9cb6-a87eeabdefba',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    parenttileid: "['init-step']['app-id'][0]['actLocTileId']",
                    hiddenNodes: ['a5419231-f121-11eb-911a-a87eeabdefba']
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'asset-ref',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: '589d38f9-edf9-11eb-90f5-a87eeabdefba',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    hiddenNodes: [
                      '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                      '589d4dcc-edf9-11eb-ae7b-a87eeabdefba'
                    ],
                    prefilledNodes: [
                      // Source set to Monument
                      [
                        '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                        'df585888-b45c-4f48-99d1-4cb3432855d5'
                      ]
                    ],
                    labels: [
                      ['Cross Reference', 'Asset Reference'],
                      ['Cross Reference Note', 'Asset Reference Note']
                    ]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'pow-ref',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: '589d38f9-edf9-11eb-90f5-a87eeabdefba',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    hiddenNodes: [
                      '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                      '589d4dcc-edf9-11eb-ae7b-a87eeabdefba'
                    ],
                    prefilledNodes: [
                      // Source set to Wreck
                      [
                        '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
                        'c14def6d-4713-465f-9119-bc33f0d6e8b3'
                      ]
                    ],
                    labels: [
                      ['Cross Reference', 'POW Reference'],
                      ['Cross Reference Note', 'POW Reference Note']
                    ]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'associated-activities',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'ea059ab7-83d7-11ea-a3c4-f875a44e0e11',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    labels: [['Activity', 'Related Acitvities']]
                  }
                },
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'associated-site',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
                    nodegroupid: 'b9e07043-5463-11e9-bb70-000d3ab1e588',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    labels: [
                      [
                        'Associated Monument, Area or Artefact',
                        'Related Sites, Monuments, or Artefacts'
                      ]
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Additional Files',
          name: 'file-upload-step',
          workflowstepclass: 'workflow-form-component',
          required: false,
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card',
                  uniqueInstanceName: '1fe572ec-8f8a-11ee-87af-0242ac190008',
                  tilesManaged: 'one',
                  parameters: {
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']",
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '1fe572ec-8f8a-11ee-87af-0242ac190008',
                    semanticName: 'Files Checklist',
                    hiddenNodes: [
                      // '64cb3004-8f8a-11ee-88d1-0242ac190008', // application_form,
                      // '2080e35c-8f8b-11ee-88d1-0242ac190008', // pow,
                      // '86b114f8-8f8b-11ee-845d-0242ac190008', // council_letter,
                      // 'c6404a76-8f8b-11ee-845d-0242ac190008', // developer_funding_form
                    ]
                  }
                },
                {
                  /**
                   * Using custom component to handle the creation of Digital
                   * Objects that will then be automatically named and related
                   * to the Excavation License model.
                   */
                  componentName: 'related-document-upload',
                  uniqueInstanceName: 'file-upload',
                  tilesManaged: 'one',
                  parameters: {
                    /**
                     * Using Digital Object graph id and the file upload
                     * node group id.
                     */
                    graphid: 'a535a235-8481-11ea-a6b9-f875a44e0e11',
                    nodegroupid: '7db68c6c-8490-11ea-a543-f875a44e0e11',

                    /**
                     * These can be difficult to work with. Sometimes the `tileId` will be all
                     * lowercase and sometimes it will be camel case. This will vary between workflows.
                     */
                    resourceModelId:
                      "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']",
                    resourceTileId: "['init-step']['app-id'][0]['tileId']",

                    /**
                     * This needs to refer to the Excavation models
                     * Digital object node group.
                     */
                    resourceModelDigitalObjectNodeGroupId: '8c5356f4-48ce-11ee-8e4e-0242ac140007',

                    label: 'Please upload the required files below'
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Communications',
          name: 'communications-step',
          required: false,
          informationboxdata: {
            heading: 'Important Information',
            text: "Using the fields below select the date the email was sent on and paste the contents in the large textbox below. After you have finished click the 'add' button at the bottom of the page. WARNING: After clicking add the date will reset to text, if this is not in a date format it will through an error."
          },
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'communications-upload-step',
                  tilesManaged: 'many',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '6840f820-48ce-11ee-8e4e-0242ac140007',
                    hiddenNodes: [
                      '6841329a-48ce-11ee-8e4e-0242ac140007',
                      '68411f12-48ce-11ee-8e4e-0242ac140007', // Communication type
                      '684121d8-48ce-11ee-8e4e-0242ac140007', // Communication description type
                      // '684113a0-48ce-11ee-8e4e-0242ac140007', // Participants
                      '68412778-48ce-11ee-8e4e-0242ac140007'
                    ],
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Record Decision',
          name: 'record-dicision-step',
          workflowstepclass: 'workflow-form-component',
          required: false,
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'default-card-util',
                  uniqueInstanceName: 'decision-made-by',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '2749ea5a-48cb-11ee-be76-0242ac140007',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']",
                    labels: [['Decision Type', 'Decision']]
                    // hiddenNodes: ['f6c207ae-5938-11ee-9e74-0242ac130007']
                  }
                }
              ]
            }
          ]
        },
        // {
        //   title: 'Site Visit',
        //   name: 'site-visit-step',
        //   workflowstepclass: 'workflow-form-component',
        //   required: false,
        //   layoutSections: [
        //     {
        //       componentConfigs: [
        //         {
        //           componentName: 'default-card-util',
        //           uniqueInstanceName: 'site-name',
        //           tilesManaged: 'one',
        //           parameters: {
        //             graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
        //             nodegroupid: '4a7bba1d-9938-11ea-86aa-f875a44e0e11',
        //             resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
        //             tileid: "['app-details-step']['site-name'][0]['tileId']",
        //             hiddenNodes: [
        //               '4a7bba20-9938-11ea-92e7-f875a44e0e11',
        //               '4a7bba21-9938-11ea-8f0f-f875a44e0e11'
        //             ],
        //             labels: [['Activity Name', 'Site Name']]
        //           }
        //         },
        //         {
        //           componentName: 'default-card-util',
        //           uniqueInstanceName: 'license-no',
        //           tilesManaged: 'one',
        //           parameters: {
        //             graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
        //             nodegroupid: '280b6cfc-4e4d-11ee-a340-0242ac140007',
        //             tileid: "['init-step']['app-id'][0]['licenseNumberTileId']",
        //             resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']",
        //             hiddenNodes: [
        //               '280b78fa-4e4d-11ee-a340-0242ac140007',
        //               '280b7a9e-4e4d-11ee-a340-0242ac140007',
        //               '280b7238-4e4d-11ee-a340-0242ac140007'
        //             ],
        //             labels: [['Cross Reference', 'License Number']]
        //           }
        //         },
        //         {
        //           componentName: 'default-card-util',
        //           uniqueInstanceName: 'cm-ref',
        //           tilesManaged: 'one',
        //           parameters: {
        //             graphid: 'b9e0701e-5463-11e9-b5f5-000d3ab1e588',
        //             nodegroupid: '589d38f9-edf9-11eb-90f5-a87eeabdefba',
        //             resourceid: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
        //             tileid: "['app-details-step']['cm-ref'][0]['tileId']",
        //             hiddenNodes: [
        //               '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
        //               '589d4dcc-edf9-11eb-ae7b-a87eeabdefba',
        //               '589d4dca-edf9-11eb-83ea-a87eeabdefba'
        //             ],
        //             prefilledNodes: [
        //               // Source set to Heritage Environment Record Number
        //               [
        //                 '589d4dcd-edf9-11eb-8a7d-a87eeabdefba',
        //                 '19afd557-cc21-44b4-b1df-f32568181b2c'
        //               ]
        //             ],
        //             labels: [['Cross Reference', 'CM Reference']]
        //           }
        //         }
        //       ]
        //     }
        //   ]
        // },
        {
          title: 'Excavation Report',
          name: 'excavation-report-step',
          workflowstepclass: 'workflow-form-component',
          required: false,
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'fetch-generated-license-number',
                  uniqueInstanceName: 'app-status',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: 'ee5947c6-48b2-11ee-abec-0242ac140007',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                },
                {
                  componentName: 'default-card',
                  uniqueInstanceName: 'report-info',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: 'f060583a-6120-11ee-9fd1-0242ac120003',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                },
                {
                  /**
                   * Using custom component to handle the creation of Digital
                   * Objects that will then be automatically named and related
                   * to the Excavation License model.
                   */
                  componentName: 'related-document-upload',
                  uniqueInstanceName: 'report-documents',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'a535a235-8481-11ea-a6b9-f875a44e0e11',
                    nodegroupid: '7db68c6c-8490-11ea-a543-f875a44e0e11',
                    resourceModelId: "['init-step']['app-id'][0]['resourceid']['actResourceId']",
                    resourceModelDigitalObjectNodeGroupId: '316c7d1e-8554-11ea-aed7-f875a44e0e11',
                    fileObjectNamePrefix: 'Site report files for '
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Cover Letter',
          name: 'cover-letter-step',
          required: false,
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'license-cover-letter',
                  uniqueInstanceName: 'cover-letter',
                  tilesManaged: 'one',
                  parameters: {
                    graphid: 'cc5da227-24e7-4088-bb83-a564c4331efd',
                    nodegroupid: '0dcf7c74-53d5-11ee-844f-0242ac130008',
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                }
              ]
            }
          ]
        },
        {
          title: 'Summary',
          name: 'license-complete',
          required: false,
          informationboxdata: {
            heading: 'Workflow Complete: Review your work',
            text: 'Please review the summary information. You can go back to a previous step to make changes or "Quit Workflow" to discard your changes and start over'
          },
          layoutSections: [
            {
              componentConfigs: [
                {
                  componentName: 'license-final-step',
                  uniqueInstanceName: 'license-final',
                  tilesManaged: 'none',
                  parameters: {
                    resourceid: "['init-step']['app-id'][0]['resourceid']['resourceInstanceId']"
                  }
                }
              ]
            }
          ]
        }
      ];

      this.safeArrayAccesses = [
        'resourceInstanceId',
        'tileId',
        'actLocTileId',
        'actResourceId',
        'licenseNumberTileId',
        'actSysRefTileId'
      ];

      EditableWorkflow.apply(this, [params]);

      this.quitUrl = arches.urls.plugin('init-workflow');
    },
    template: workflowTemplate
  });
});
