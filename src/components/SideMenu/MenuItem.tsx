// import { observe } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';

import { ShelfIcon } from '../../common-elements/shelfs';
import { IMenuItem, OperationModel } from '../../services';
import { shortenHTTPVerb, shortenItemType } from '../../utils/openapi';
import { OptionsContext } from '../OptionsProvider';
import { MenuItems } from './MenuItems';
import { ItemTypeBadge, MenuItemLabel, MenuItemLi, MenuItemTitle, OperationBadge } from './styled.elements';

export interface MenuItemProps {
  item: IMenuItem;
  onActivate?: (item: IMenuItem) => void;
  withoutChildren?: boolean;
}

@observer
export class MenuItem extends React.Component<MenuItemProps> {
  ref = React.createRef<HTMLLabelElement>();

  activate = (evt: React.MouseEvent<HTMLElement>) => {
    this.props.onActivate!(this.props.item);
    evt.stopPropagation();
  };

  componentDidMount() {
    this.scrollIntoViewIfActive();
  }

  componentDidUpdate() {
    this.scrollIntoViewIfActive();
  }

  scrollIntoViewIfActive() {
    if (this.props.item.active && this.ref.current) {
      this.ref.current.scrollIntoViewIfNeeded();
    }
  }

  saveRef = ref => {
    this.ref = ref;
  };

  render() {
    const { item, withoutChildren } = this.props;
    return (
      <MenuItemLi onClick={this.activate} depth={item.depth} data-item-id={item.id}>
        {item.type === 'operation' ? (
          <OperationMenuItemContent {...this.props} item={item as OperationModel} />
        ) : (
          <MenuItemLabel depth={item.depth} active={item.active} type={item.type} ref={this.ref}>
            <MenuItemTitle title={item.name}>
              {item.name}
              {this.props.children}
            </MenuItemTitle>
            {(item.depth > 0 && item.items.length > 0 && (
              <ShelfIcon float={'right'} direction={item.expanded ? 'down' : 'right'} />
            )) ||
            null}
          </MenuItemLabel>
        )}
        {!withoutChildren && item.items && item.items.length > 0 && (
          <MenuItems
            expanded={item.expanded}
            items={item.items}
            onActivate={this.props.onActivate}
          />
        )}
      </MenuItemLi>
    );
  }
}

export interface OperationMenuItemContentProps {
  item: OperationModel;
}

@observer
export class OperationMenuItemContent extends React.Component<OperationMenuItemContentProps> {
  ref = React.createRef<HTMLLabelElement>();

  componentDidUpdate() {
    if (this.props.item.active && this.ref.current) {
      this.ref.current.scrollIntoViewIfNeeded();
    }
  }

  render() {
    const { item } = this.props;
    const padding = !item.itemType ? "20px" : '0px'
    return (
      <MenuItemLabel
        depth={item.depth}
        active={item.active}
        deprecated={item.deprecated}
        ref={this.ref}
      >
        <OptionsContext.Consumer>
          {
            options => options.itemTypesInsteadOfOperations
              ? <ItemTypeBadge type={item.itemType}>{shortenItemType(item.itemType)}</ItemTypeBadge>
              : <OperationBadge type={item.httpVerb}>{shortenHTTPVerb(item.httpVerb)}</OperationBadge>
          }
        </OptionsContext.Consumer>
        <MenuItemTitle width="calc(100% - 38px)" padding={padding}>
          {item.name}
          {this.props.children}
        </MenuItemTitle>
      </MenuItemLabel>
    );
  }
}
