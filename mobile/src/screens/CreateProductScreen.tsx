import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

interface CreateProductScreenProps {
  onCreateProduct: (data: any) => Promise<void>;
  onCancel: () => void;
}

const CATEGORIES = [
  { value: 'books', label: 'Livros' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'accessories', label: 'Acessórios' },
  { value: 'music', label: 'Música' },
  { value: 'art', label: 'Arte' },
  { value: 'services', label: 'Serviços' },
  { value: 'food', label: 'Alimentos' },
  { value: 'other', label: 'Outros' },
];

const CreateProductScreen = ({ onCreateProduct, onCancel }: CreateProductScreenProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('books');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert('Erro', 'Título e preço são obrigatórios');
      return;
    }

    const priceValue = parseFloat(price.replace(',', '.'));
    if (isNaN(priceValue)) {
      Alert.alert('Erro', 'Preço inválido');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateProduct({
        title,
        description,
        price: priceValue,
        category,
        images,
      });
      onCancel();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar produto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImagePlaceholder = () => {
    setImages([...images, `https://picsum.photos/400/40${images.length}`]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criar Produto</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
          <Text style={[styles.saveButton, isSubmitting && styles.buttonDisabled]}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do produto"
            placeholderTextColor="#94A3B8"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Preço *</Text>
          <TextInput
            style={styles.input}
            placeholder="0,00"
            placeholderTextColor="#94A3B8"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryButton,
                  category === cat.value && styles.categoryButtonSelected,
                ]}
                onPress={() => setCategory(cat.value)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat.value && styles.categoryTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Imagens</Text>
          <TouchableOpacity style={styles.addImageButton} onPress={addImagePlaceholder}>
            <Text style={styles.addImageText}>+ Adicionar Imagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CDD4DC',
  },
  cancelButton: {
    color: '#64748B',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  saveButton: {
    color: '#033D60',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#201E1E',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#201E1E',
    borderWidth: 1,
    borderColor: '#CDD4DC',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CDD4DC',
  },
  categoryButtonSelected: {
    backgroundColor: '#033D60',
    borderColor: '#033D60',
  },
  categoryText: {
    fontSize: 14,
    color: '#64748B',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  addImageButton: {
    height: 48,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#CDD4DC',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    color: '#64748B',
    fontSize: 14,
  },
});

export default CreateProductScreen;
