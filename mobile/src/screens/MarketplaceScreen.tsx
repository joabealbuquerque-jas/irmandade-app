import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

interface Product {
  id: number;
  seller_id: number;
  title: string;
  description?: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  status: string;
  views_count: number;
  created_at: string;
}

interface MarketplaceScreenProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onCreateProduct: () => void;
}

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

const CATEGORIES: Record<string, string> = {
  books: 'Livros',
  clothing: 'Roupas',
  accessories: 'Acessórios',
  music: 'Música',
  art: 'Arte',
  services: 'Serviços',
  food: 'Alimentos',
  other: 'Outros',
};

const MarketplaceScreen = ({ products, onSelectProduct, onCreateProduct }: MarketplaceScreenProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onSelectProduct(item)}
    >
      <View style={styles.imageContainer}>
        {item.images.length > 0 ? (
          <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>📦</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        <Text style={styles.productCategory}>
          {CATEGORIES[item.category] || item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <TouchableOpacity onPress={onCreateProduct}>
          <Text style={styles.headerButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.column}
      />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#201E1E',
  },
  headerButton: {
    fontSize: 24,
    color: '#033D60',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
  column: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: COLUMN_WIDTH,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 40,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#201E1E',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#033D60',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: '#64748B',
  },
});

export default MarketplaceScreen;
