import * as React from 'react';

import { InnerPropertiesWrap, PropertyCellWithInner, UnderlinedHeader } from '../../common-elements';
import { PropertiesTable } from '../../common-elements/fields-layout';

import { FieldModel } from '../../services/models';
import { Field } from '../Fields/Field';

import { mapWithLast } from '../../utils';

import { OptionsContext } from '../OptionsProvider';
import { Schema } from '../Schema';

export interface ParametersGroupProps {
  place: string;
  parameters: FieldModel[];
}

export class ParametersGroup extends React.PureComponent<ParametersGroupProps, any> {
  render() {
    const { place, parameters } = this.props;
    if (!parameters || !parameters.length) {
      return null;
    }

    const Aux = props => props.children;

    return (
      <div key={place}>
        <OptionsContext.Consumer>
          {
            options => {
              if (!options.rootParamNameAsGroupHeader) {
                return (
                  <Aux>
                    <UnderlinedHeader>{place} Parameters</UnderlinedHeader>
                    <PropertiesTable>
                      <tbody>
                      {
                        mapWithLast(parameters, (field, isLast) => (
                          <Field key={field.name} isLast={isLast} field={field} showExamples={true} />
                        ))
                      }
                      </tbody>
                    </PropertiesTable>
                  </Aux>
                );
              } else {
                if (parameters.length !== 1) {
                  throw new Error('rootParamNameAsGroupHeader can be used only for one root parameter');
                }

                const rootField: FieldModel = parameters[0];
                const rootFieldParameters: FieldModel[] = [];

                for (const field of rootField.schema.fields || []) {
                  rootFieldParameters.push(field);
                }

                return (
                  <Aux>
                    <UnderlinedHeader>{rootField.schema.title}</UnderlinedHeader>
                    <p>{rootField.schema.description}</p>
                    <tr key={rootField.name + 'inner'}>
                      <PropertyCellWithInner colSpan={2}>
                        <InnerPropertiesWrap>
                          <Schema schema={rootField.schema} />
                        </InnerPropertiesWrap>
                      </PropertyCellWithInner>
                    </tr>
                    <PropertiesTable>
                      <tbody>
                      {
                        mapWithLast(rootFieldParameters, (field, isLast) => (
                          <Field key={field.name} isLast={isLast} field={field} showExamples={true} />
                        ))
                      }
                      </tbody>
                    </PropertiesTable>
                  </Aux>
                );
              }
            }
          }
        </OptionsContext.Consumer>
      </div>
    );
  }
}
