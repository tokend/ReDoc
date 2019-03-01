import { observer } from 'mobx-react';
import * as React from 'react';

import {
  OneOfButton as StyledOneOfButton,
  OneOfLabel,
  OneOfList,
} from '../../common-elements/schema';
import { SchemaModel } from '../../services/models';
import { OptionsContext } from '../OptionsProvider';
import { Schema, SchemaProps } from './Schema';

export interface OneOfButtonProps {
  subSchema: SchemaModel;
  idx: number;
  schema: SchemaModel;
}

@observer
export class OneOfButton extends React.Component<OneOfButtonProps> {
  render() {
    const { idx, schema } = this.props;
    return (
      <StyledOneOfButton active={idx === schema.activeOneOf} onClick={this.activateOneOf}>
        <OptionsContext.Consumer>
          {options => this.getContentToRender(options.cropArmPrefixes)}
        </OptionsContext.Consumer>
      </StyledOneOfButton>
    );
  }

  activateOneOf = () => {
    this.props.schema.activateOneOf(this.props.idx);
  };

  getContentToRender = (cropArmPrefix: boolean) => {
    const { subSchema } = this.props;

    if (subSchema.title) {
      return cropArmPrefix
        ? subSchema.title.split('Arm')[1] // TODO: will fail if more than one 'Arm' present
        : subSchema.title;
    }

    return subSchema.typePrefix + subSchema.displayType;
  };
}

@observer
export class OneOfSchema extends React.Component<SchemaProps> {
  render() {
    const {
      schema: { oneOf },
      schema,
    } = this.props;

    if (oneOf === undefined) {
      return null;
    }
    return (
      <div>
        <OneOfLabel> {schema.oneOfType} </OneOfLabel>
        <OneOfList>
          {oneOf.map((subSchema, idx) => (
            <OneOfButton key={subSchema.pointer} schema={schema} subSchema={subSchema} idx={idx} />
          ))}
        </OneOfList>
        <Schema {...this.props} schema={oneOf[schema.activeOneOf]} />
      </div>
    );
  }
}
