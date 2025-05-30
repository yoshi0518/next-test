import type { FieldMetadata } from '@conform-to/react';

const simplify = <Props>(props: Props) => {
  for (const key in props) {
    if (props[key] === undefined) {
      delete props[key];
    }
  }
  return props;
};

export const getSelectProps = <Schema>(metadata: FieldMetadata<Schema>, options: { value?: boolean } = {}) => {
  const props: {
    key?: string;
    required?: boolean;
    name: string;
    defaultValue?: string;
  } = {
    key: metadata.key,
    required: metadata.required,
    name: metadata.name,
  };

  if (typeof options.value === 'undefined' || options.value) {
    props.defaultValue = metadata.initialValue?.toString();
  }

  return simplify(props);
};

export const getSelectTriggerProps = <Schema>(
  metadata: FieldMetadata<Schema>,
  options:
    | {
        ariaAttributes?: true;
        ariaInvalid?: 'errors' | 'allErrors';
        ariaDescribedBy?: string;
      }
    | {
        ariaAttributes?: false;
      } = {
    ariaAttributes: true,
  },
) => {
  const props: {
    'id': string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  } = {
    id: metadata.id,
  };

  if (options.ariaAttributes) {
    const invalid = options.ariaInvalid === 'allErrors' ? !metadata.valid : typeof metadata.errors !== 'undefined';
    const ariaDescribedBy = options.ariaDescribedBy;
    props['aria-invalid'] = invalid || undefined;
    props['aria-describedby'] = invalid ? `${metadata.errorId} ${ariaDescribedBy ?? ''}`.trim() : ariaDescribedBy;
  }

  return simplify(props);
};

export const getCheckboxProps = <Schema>(
  metadata: FieldMetadata<Schema>,
  options:
    | {
        ariaAttributes?: true;
        ariaInvalid?: 'errors' | 'allErrors';
        ariaDescribedBy?: string;
        value?: boolean;
      }
    | {
        ariaAttributes: false;
        value?: boolean;
      } = {
    ariaAttributes: true,
  },
) => {
  const props: {
    'id': string;
    'key'?: string;
    'required'?: boolean;
    'name': string;
    'defaultChecked'?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  } = {
    id: metadata.id,
    key: metadata.key,
    required: metadata.required,
    name: metadata.name,
  };

  if (typeof options.value === 'undefined' || options.value) {
    props.defaultChecked = metadata.initialValue === 'on';
  }

  if (options.ariaAttributes) {
    const invalid = options.ariaInvalid === 'allErrors' ? !metadata.valid : typeof metadata.errors !== 'undefined';
    const ariaDescribedBy = options.ariaDescribedBy;
    props['aria-invalid'] = invalid || undefined;
    props['aria-describedby'] = invalid ? `${metadata.errorId} ${ariaDescribedBy ?? ''}`.trim() : ariaDescribedBy;
  }

  return simplify(props);
};

export const getRadioGroupProps = <Schema>(
  metadata: FieldMetadata<Schema>,
  options:
    | {
        ariaAttributes?: true;
        ariaInvalid?: 'errors' | 'allErrors';
        ariaDescribedBy?: string;
        value?: boolean;
      }
    | {
        ariaAttributes: false;
        value?: boolean;
      } = {
    ariaAttributes: true,
  },
) => {
  const props: {
    'key'?: string;
    'required'?: boolean;
    'name': string;
    'defaultValue'?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  } = {
    key: metadata.key,
    required: metadata.required,
    name: metadata.name,
  };

  if (typeof options.value === 'undefined' || options.value) {
    props.defaultValue = metadata.initialValue?.toString();
  }

  if (options.ariaAttributes) {
    const invalid = options.ariaInvalid === 'allErrors' ? !metadata.valid : typeof metadata.errors !== 'undefined';
    const ariaDescribedBy = options.ariaDescribedBy;
    props['aria-invalid'] = invalid || undefined;
    props['aria-describedby'] = invalid ? `${metadata.errorId} ${ariaDescribedBy ?? ''}`.trim() : ariaDescribedBy;
  }

  return simplify(props);
};

export const getSwitchProps = <Schema>(
  metadata: FieldMetadata<Schema>,
  options:
    | {
        ariaAttributes?: true;
        ariaInvalid?: 'errors' | 'allErrors';
        ariaDescribedBy?: string;
        value?: boolean;
      }
    | {
        ariaAttributes: false;
        value?: boolean;
      } = {
    ariaAttributes: true,
  },
) => {
  const props: {
    'id': string;
    'key'?: string;
    'required'?: boolean;
    'name': string;
    'defaultChecked'?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  } = {
    id: metadata.id,
    key: metadata.key,
    required: metadata.required,
    name: metadata.name,
  };

  if (typeof options.value === 'undefined' || options.value) {
    props.defaultChecked = metadata.initialValue === 'on';
  }

  if (options.ariaAttributes) {
    const invalid = options.ariaInvalid === 'allErrors' ? !metadata.valid : typeof metadata.errors !== 'undefined';
    const ariaDescribedBy = options.ariaDescribedBy;
    props['aria-invalid'] = invalid || undefined;
    props['aria-describedby'] = invalid ? `${metadata.errorId} ${ariaDescribedBy ?? ''}`.trim() : ariaDescribedBy;
  }

  return simplify(props);
};
